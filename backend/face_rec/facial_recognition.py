import sys
sys.path.append('..')
import tensorflow as tf
import numpy as np
import pickle
from keras.models import load_model
import cv2
from facenet_pytorch import MTCNN
from api.student.crud import set_present_status, completed_attendance

# -------------------------------------------------------------------------------------------------------------
def image_processing_1(image):
    
    # Load the image
    img = cv2.imread(image)

    # Pre-process the image
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = np.array(img, dtype=np.float32) / 255.0
    img = np.expand_dims(img, axis=0)

    # Create the model
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(None, None, 3)),
        tf.keras.layers.Lambda(lambda x: tf.image.adjust_brightness(x, delta=0.5))
    ])

    # Apply the model to the image
    new_img = model(img)[0].numpy()

    # Post-process the image
    new_img = np.clip(new_img, 0.0, 1.0)
    new_img = np.uint8(new_img * 255.0)
    new_img = cv2.cvtColor(new_img, cv2.COLOR_RGB2BGR)

    return new_img


# -------------------------------------------------------------------------------------------------------------
def check_img_darkness(image):

    # Load the image
    img = cv2.imread(image)

    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Calculate the histogram of the image
    hist = cv2.calcHist([gray], [0], None, [256], [0, 256])

    # Calculate the total number of pixels in the image
    total_pixels = gray.shape[0] * gray.shape[1]

    # Calculate the percentage of pixels that are in the darkest and brightest 5% of the histogram
    darkest_pixels = sum(hist[:13])
    brightest_pixels = sum(hist[242:])
    darkest_percent = darkest_pixels / total_pixels * 100
    brightest_percent = brightest_pixels / total_pixels * 100

    # Check if the image is poorly exposed
    if darkest_percent > 5 or brightest_percent > 5:
        # True if it is poorly exposed
        return True
    else:
        # False if it is well exposed
        return False


# -------------------------------------------------------------------------------------------------------------

def facial_recognition(subject_code, session_number, week):

    # Read the contents of the pickle file
    with open('../face_rec/class_names.pkl', 'rb') as f:
        # Load the data from the file
        class_names = pickle.load(f)

    print(class_names)

    # Count for managing print statements for when a face is not detected
    count = 0

    # Confidence threshold
    confidence_threshold = 0.85

    # Load model 1
    model1 = load_model("../face_rec/models/vgg19_model")

    # Load model 2
    model2 = tf.saved_model.load("../face_rec/models/efficientnetb0_model")

    # Initialize MTCNN for face detection
    mtcnn_detector = MTCNN()

    # Initialize webcam
    webcam = cv2.VideoCapture(0)

    # Run loop for live face detection
    while True:
        # Capture frame from webcam
        ret, frame = webcam.read()

        # Detect faces using MTCNN
        boxes, _ = mtcnn_detector.detect(frame)

        # Create list to store the detected faces
        faces = []

        # Draw bounding boxes around the detected faces
        if boxes is not None:
            for box in boxes:
                x1, y1, x2, y2 = box.astype('int')
                width = x2 - x1
                height = y2 - y1
                # Increase width and height of bounding box by 12%
                x1 -= int(0.12 * width)
                y1 -= int(0.12 * height)
                x2 += int(0.12 * width)
                y2 += int(0.12 * height)


                face = frame[y1:y2, x1:x2]          # Stores the cropped face within the bounding box into a variable
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)        # Displays bounding box around face

                # Checks whether a face is detected in the frame and if the width and height of the bounding box is greater than 50 pixels
                # to filter out false detections
                if face.size > 0 and width > 50 and height > 50:
                    
                    # Maintain aspect ratio of image
                    h, w, _ = face.shape
                    scale = max(h, w) / 224
                    new_h = int(h / scale)
                    new_w = int(w / scale)
                    top = (224 - new_h) // 2
                    bottom = 224 - new_h - top
                    left = (224 - new_w) // 2
                    right = 224 - new_w - left

                    # Save cropped frame as an image to be passed into the check_img_darkness() function
                    cv2.imwrite('bbox_image.jpg', face)
                    bbox_img = 'bbox_image.jpg'
                    result = check_img_darkness(bbox_img)         # Checks if image is dark enough for processing

                    if result:
                        processed_img = image_processing_1(bbox_img)         # Image goes into a processing function to alter brightness
                        # Resize processed image
                        img_resized = cv2.resize(processed_img, (new_w, new_h))
                    else:
                        # Resize cropped frame
                        img_resized = cv2.resize(face, (new_w, new_h))

                    img_resized = cv2.copyMakeBorder(img_resized, top, bottom, left, right, cv2.BORDER_CONSTANT, value=(0, 0, 0))

                    # Normalize image
                    img = tf.keras.preprocessing.image.img_to_array(img_resized)
                    img = np.expand_dims(img, axis=0)
                    img = tf.cast(img, dtype=tf.float32)

                    # Append all faces detected in the image
                    faces.append(img)
            
            # Checks whether the faces list contains at least one face
            if len(faces) > 0:
                count = 0
                # Concatenate the list of preprocessed faces into an array
                faces_array = np.concatenate(faces, axis=0)

                # Use model 1 to make a prediction on the preprocessed faces
                pred1 = model1.predict(faces_array)

                # Use model 2 to make a prediction on the preprocessed faces
                pred2 = model2(faces_array)

                # Compute the average prediction of the two models
                ensemble_preds = np.mean([pred1, pred2], axis=0)

                # Get the predicted classes for each face
                pred_classes = np.argmax(ensemble_preds, axis=1)

                # Obtains predicted class and their respective probability
                for i, pred_class in enumerate(pred_classes):
                    output_class = class_names[pred_class]
                    output_prob = ensemble_preds[i][pred_class]
                    
                    # Checks whether the predicted probability is above the threshold and below 100% to eliminate processing of anything
                    # other than a face
                    if ((output_prob >= confidence_threshold) and (output_prob <= 0.99)):
                        print(f"Face {i+1}: {output_class}, Probability: {output_prob:.2f}")
                        set_present_status(output_class, subject_code, week)

        elif(count == 0):
            count = 1
            print("Looking for a face...")

        # Show frame with bounding boxes
        cv2.imshow('Live Face Detection', frame)

        # Press 'q' to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            completed_attendance(subject_code, session_number, week)
            break

    # Release webcam and close window
    webcam.release()
    cv2.destroyAllWindows()