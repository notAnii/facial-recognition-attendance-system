import tensorflow as tf
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.image
import mtcnn            # for using mtcnn.MTCNN() `detect_faces()`
import numpy as np
from keras.models import load_model
import cv2
import os
from datetime import datetime
from facenet_pytorch import MTCNN       # for using MTCNN() `detect()`
import retinaface
from retinaface import RetinaFace

# -------------------------------------------------------------------------------------------------------------
def image_processing_1(image):
    
    #load the image
    img = cv2.imread(image)

    #pre-process the image
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = np.array(img, dtype=np.float32) / 255.0
    img = np.expand_dims(img, axis=0)

    #create the model
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(None, None, 3)),
        tf.keras.layers.Lambda(lambda x: tf.image.adjust_brightness(x, delta=0.5))
    ])

    #apply the model to the image
    new_img = model(img)[0].numpy()

    #post-process the image
    new_img = np.clip(new_img, 0.0, 1.0)
    new_img = np.uint8(new_img * 255.0)
    new_img = cv2.cvtColor(new_img, cv2.COLOR_RGB2BGR)

    return new_img

# -------------------------------------------------------------------------------------------------------------
def image_processing_2(image):

    img = cv2.imread(image)
    gamma_value = 0.5

    gamma_table=[np.power(x/255.0, gamma_value)*255.0 for x in range(256)]
    gamma_table = np.round(np.array(gamma_table)).astype(np.uint8)

    new_img = cv2.LUT(img, gamma_table)
    return new_img

# -------------------------------------------------------------------------------------------------------------
def image_processing_3(image):

    gamma = 0.4

    #load the image
    img = cv2.imread(image)

    gamma_table=[np.power(x/255.0,gamma)*255.0 for x in range(256)]
    gamma_table=np.round(np.array(gamma_table)).astype(np.uint8)
    img = cv2.LUT(img,gamma_table)

    # Preprocess the image
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = np.array(img, dtype=np.float32) / 255.0
    img = np.expand_dims(img, axis=0)


    # Create the model
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(None, None, 3)),
        tf.keras.layers.Lambda(lambda x: tf.image.adjust_brightness(x, delta=0.4))
    ])

    # Apply the model to the image
    exposed_img = model(img)[0].numpy()

    # Postprocess the image
    exposed_img = np.clip(exposed_img, 0.0, 1.0)
    exposed_img = np.uint8(exposed_img * 255.0)
    exposed_img = cv2.cvtColor(exposed_img, cv2.COLOR_RGB2BGR)

    return exposed_img


# -------------------------------------------------------------------------------------------------------------
def check_if_img_is_dark(image):
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
        #True if it is poorly exposed
        return True
    else:
        #False if it is well exposed
        return False

# -------------------------------------------------------------------------------------------------------------
def live_cropped_DETECT_face_detection():

    # Get class names to print when making predictions
    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    'extracted_faces_uni'
    )
    class_names = train_ds.class_names

    # Count for managing print statements for when a face is not detected
    count = 0

    # Count for checking processed imgs
    counter = 0

    # Confidence threshold
    confidence_threshold = 0.85

    # Load model 1
    model1 = load_model("extracted_uni_model_dropout")

    # Load model 2
    model2 = tf.saved_model.load("efficientnet_model")

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

        # Create list to store detected faces
        faces = []

        # Draw bounding boxes around detected faces
        if boxes is not None:
            for box in boxes:
                x1, y1, x2, y2 = box.astype('int')

                face = frame[y1:y2, x1:x2]          # crops whatever bounding box picks up on
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)        # displays bounding box around face

                if face.size > 0:
                    # save cropped frame as an image
                    cv2.imwrite('bbox_image.jpg', face)
                    bbox_img = 'bbox_image.jpg'
                    result = check_if_img_is_dark(bbox_img)         # checks if image is dark enough for processing   
                    # print(result)

                    if result:
                        counter = counter + 1
                        processed_img = image_processing_1(bbox_img)         # image goes into a processing function to alter brightness
                        # resize processed image
                        img_resized = cv2.resize(processed_img, (224, 224))
                        cv2.imwrite(f'processed_imgs/img_{counter}.jpg', img_resized)
                        # cv2.imshow("processed pic", img_resized)
                    else:
                        # resize cropped frame
                        img_resized = cv2.resize(face, (224, 224))

                    # normalize image
                    img = np.expand_dims(img_resized, axis=0)
                    img = tf.keras.applications.resnet50.preprocess_input(img)
                    faces.append(img)

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
                # print("ensemble_preds = ", ensemble_preds)

                # Get the predicted classes for each faceq
                pred_classes = np.argmax(ensemble_preds, axis=1)
                # print("pred_classes = ", pred_classes)

                for i, pred_class in enumerate(pred_classes):
                    output_class = class_names[pred_class]
                    output_prob = ensemble_preds[i][pred_class]
                    
                    # Second 'if condition' to eliminate processing of anything other than a face (might not be fullproof)
                    if ((output_prob >= confidence_threshold) and (output_prob <= 0.99)):
                        print(f"Face {i+1}: {output_class}, Probability: {output_prob:.2f}")
                        # print(pred[i])        # Prints output_prob of all classes

        elif(count == 0):
            count = 1
            print("Looking for a face...")

        # Show frame with bounding boxes
        cv2.imshow('Live Face Detection', frame)

        # Press 'q' to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release webcam and close window
    webcam.release()
    cv2.destroyAllWindows()


live_cropped_DETECT_face_detection()