import sys
sys.path.append('..')
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
from api.student.read import set_present_status

def webcam():   
    # webcam stuff
    cap = cv2.VideoCapture(0)

    # check if the webcam is opened correctly
    if not cap.isOpened():
        raise IOError("Cannot open webcam.")

    while True:
        ret, frame = cap.read()
        frame = cv2.resize(frame, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
        cv2.imshow('Input', frame)

        cv2.imwrite('test_samples/webcam_capture.jpg', frame)

        c = cv2.waitKey(1)
        if c == 27:
            break

    cap.release()
    cv2.destroyAllWindows()

    # load image from file
    photo = mpl.image.imread('test_samples/webcam_capture.jpg')
    photo.shape

    face_detector = mtcnn.MTCNN()
    face_roi = face_detector.detect_faces(photo)
    print(face_roi)

    # extract the bounding box from the first face
    x1, y1, width, height = face_roi[0]['box']
    x2, y2 = x1 + width, y1 + height
    face = photo[y1:y2, x1:x2]
    print(face.shape)

    mpl.pyplot.imshow(photo)
    mpl.pyplot.show()


# webcam()

# -------------------------------------------------------------------------------------------------------------
def load_fr_model():
    # Load model
    fr_model = load_model("extracted_model")

    return fr_model


# load_fr_model()

# -------------------------------------------------------------------------------------------------------------
def make_prediction_on_images_in_dir(dir_path, img_height, img_width):

    start = datetime.now()

    print("Loading model...")
    model = load_fr_model()

    # Loop through all images in the directory
    for filename in os.listdir(dir_path):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            # Read image
            image_path = os.path.join(dir_path, filename)
            image = cv2.imread(image_path)
            image_resized = cv2.resize(image, (img_height, img_width))
            image = np.expand_dims(image_resized, axis = 0)

            print("\nMaking prediction on", filename, "...")
            pred = model.predict(image)
            print(pred)              # to access specific class value, use pred[0, class_number] || ex: pred[0, 1] gets second class


    cv2.destroyAllWindows()

    duration = datetime.now() - start
    print("\nPredictions completed in time: ", duration)


dir_path = 'test_samples/'
# make_prediction_on_images_in_dir(dir_path, 224, 224)

# -------------------------------------------------------------------------------------------------------------
def make_prediction_on_preprocessed_frame():
    # Load the saved ResNet50 model
    model = load_fr_model()

    # Open a connection to the video stream
    cap = cv2.VideoCapture(0)

    # Continuously read frames from the video stream
    while True:
        # Read a frame from the video stream
        ret, frame = cap.read()

        if not ret:
            break
        
        # Preprocess the frame by resizing and normalizing
        img_resized = cv2.resize(frame, (224, 224))
        img = np.expand_dims(img_resized, axis=0)
        img = img / 255.0
        
        # Use the ResNet50 model to make a prediction on the preprocessed frame
        print("Making prediction...")
        pred = model.predict(img)
        # pred_class = np.argmax(pred)
        print(pred)
        
        # Display the result in a window
        cv2.imshow('Video', frame)
        
        # Exit the loop if the 'q' key is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the video stream and close the window
    cap.release()
    cv2.destroyAllWindows()


# make_prediction_on_preprocessed_frame()

# -------------------------------------------------------------------------------------------------------------
def live_cropped_DETECT_face_detection():

    # Get class names to print when making predictions
    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    'extracted_faces'
    )
    class_names = train_ds.class_names

    count = 0

    # Load the saved ResNet50 model
    model = load_fr_model()

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
                    # Preprocess the frame by resizing and normalizing
                    img_resized = cv2.resize(face, (224, 224))
                    img = np.expand_dims(img_resized, axis=0)
                    img = tf.keras.applications.resnet50.preprocess_input(img)
                    # cv2.imshow('Resized face', img)
                    faces.append(img)

            if len(faces) > 0:
                count = 0
                # Concatenate the list of preprocessed faces into an array
                faces_array = np.concatenate(faces, axis=0)

                # Use the saved ResNet50 model to make a prediction on the preprocessed faces
                pred = model.predict(faces_array)
                # Get the predicted classes for each face
                pred_classes = np.argmax(pred, axis=1)
                for i, pred_class in enumerate(pred_classes):
                    output_class = class_names[pred_class]
                    print(f"Face {i}: {output_class}")

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


# live_cropped_DETECT_face_detection()

# -------------------------------------------------------------------------------------------------------------
def live_cropped_DETECTFACE_face_detection():
     # Get class names to print when making predictions
    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    'extracted_faces'
    )
    class_names = train_ds.class_names
    # with open('class_names', 'rb') as f:
    #     class_names = pickle.load(f)

    # Load the saved ResNet50 model
    model = load_fr_model()

    # Initialize MTCNN for face detection
    face_detector = mtcnn.MTCNN()

    # Initialize webcam
    webcam = cv2.VideoCapture(0)

    # Run loop for live face detection
    while True:
        # Capture frame from webcam
        ret, frame = webcam.read()
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        faces = face_detector.detect_faces(rgb)

        for face in faces:

            # Get the bounding box coordinates of the face
            x, y, w, h = face['box']

            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

            # Extract the face ROI from the frame
            face_roi = rgb[y:y+h, x:x+w]

            # Resize the face ROI to the input size of the classification model
            face_roi_resized = cv2.resize(face_roi, (224, 224))

            # Preprocess the face ROI
            face_roi_resized = np.expand_dims(face_roi_resized, axis=0)
            face_roi_resized = tf.keras.applications.resnet50.preprocess_input(face_roi_resized)

            pred = model.predict(face_roi_resized)
            output_class = class_names[np.argmax(pred)]
            print(output_class)
            output_prob = np.max(pred)
            print(output_prob*100)
         
        # Show frame with bounding boxes
        cv2.imshow('Live Face Detection', frame)

        # Press 'q' to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release webcam and close window
    webcam.release()
    cv2.destroyAllWindows()


#live_cropped_DETECTFACE_face_detection()

# -------------------------------------------------------------------------------------------------------------
def start_live_attendance(subject_code, session_number, week):

    # Get class names to print when making predictions
    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    'extracted_faces'
    )
    class_names = train_ds.class_names

    count = 0
    # Load the saved ResNet50 model
    model = load_fr_model()

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
                    # Preprocess the frame by resizing and normalizing
                    img_resized = cv2.resize(face, (224, 224))
                    img = np.expand_dims(img_resized, axis=0)
                    img = tf.keras.applications.resnet50.preprocess_input(img)
                    # cv2.imshow('Resized face', img)
                    faces.append(img)

            if len(faces) > 0:
                count = 0
                # Concatenate the list of preprocessed faces into an array
                faces_array = np.concatenate(faces, axis=0)

                # Use the saved ResNet50 model to make a prediction on the preprocessed faces
                pred = model.predict(faces_array)
                # Get the predicted classes for each face
                pred_classes = np.argmax(pred, axis=1)
                for i, pred_class in enumerate(pred_classes):
                    output_class = class_names[pred_class]
                    output_prob = np.max(pred)
                    if(output_prob >= 0.90):
                        print(f"Face {i}: {output_class}")
                        set_present_status(output_class, subject_code, session_number, week)
                    else:
                        print("Unknown Face")    

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
