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

# ----------------------------------------------------------------------------------------------------------------------------------

def load_fr_model():
    # Load model
    #fr_model = load_model("extracted_uni_model")
    fr_model = tf.saved_model.load('efficientnet_model')

    return fr_model


train_ds = tf.keras.preprocessing.image_dataset_from_directory('extracted_faces_uni')
class_names = train_ds.class_names


# Load the trained model
model = load_fr_model()
class_names = ['6536177', '6616781', '6633249', '6683113', '6698360']


def test_mtcnn():
    

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

        # Skip the rest of the loop if no faces are detected
        if boxes is None:
            continue

        # Create list to store detected faces
        faces = []

        # Draw bounding boxes around detected faces
        for box in boxes:
            x1, y1, x2, y2 = box.astype('int')
            face = frame[y1:y2, x1:x2]          # crops whatever bounding box picks up on
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)        # displays bounding box around face

            if face.size > 0:
               
                # processed_img = image_processing_3(bbox_img)         # image goes into a processing function to alter brightness
                # resize processed image while maintaining aspect ratio
                h, w, _ = face.shape
                scale = max(h, w) / 224
                new_h = int(h / scale)
                new_w = int(w / scale)
                top = (224 - new_h) // 2
                bottom = 224 - new_h - top
                left = (224 - new_w) // 2
                right = 224 - new_w - left

                img_resized = cv2.resize(face, (new_w, new_h))
                img_resized = cv2.copyMakeBorder(img_resized, top, bottom, left, right, cv2.BORDER_CONSTANT, value=(0, 0, 0))
                cv2.imshow('img_resized', img_resized)

                img = tf.keras.preprocessing.image.img_to_array(img_resized)
                img = np.expand_dims(img, axis=0)
                img = tf.cast(img, dtype=tf.float32)

                predictions = model(img)
                predicted_class_index = np.argmax(predictions[0])
                predicted_class_name = class_names[predicted_class_index]
                print('Predicted class:', predicted_class_name)

            # normalize image
            # img = np.expand_dims(img_resized, axis=0)
            # img = tf.keras.applications.resnet50.preprocess_input(img)
            faces.append(img)

        
        # Show frame with bounding boxes
        cv2.imshow('Live Face Detection', frame)

        # Press 'q' to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release webcam and close window
    webcam.release()
    cv2.destroyAllWindows()

test_mtcnn()