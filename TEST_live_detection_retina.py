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
from retinaface import RetinaFace

# ----------------------------------------------------------------------------------------------------------------------------------

# ----------------------------------------------------------------------------------------------------------------------------------

def load_fr_model():
    # Load model
    #fr_model = load_model("extracted_uni_model")
    fr_model = tf.saved_model.load('efficientnet_model')

    return fr_model


train_ds = tf.keras.preprocessing.image_dataset_from_directory('student_dataset_extracted_sp_ar_nofar')
class_names = train_ds.class_names


# Load the trained model
model = load_fr_model()

model2 = tf.saved_model.load("efficientnet_model_2")

class_names = ['6536177', '6616781', '6633249', '6683113', '6698360']


def test_retina():

    # Initialize webcam
    webcam = cv2.VideoCapture(0)

    # Confidence threshold
    confidence_threshold = 0.85

    # Run loop for live face detection
    while True:
        # Capture frame from webcam
        ret, frame = webcam.read()

        # Create list to store detected faces
        #faces = []
        faces = RetinaFace.extract_faces(frame, align=False)

        if len(faces) is None:
            continue

        # Draw bounding boxes around detected faces
        for i, face in enumerate(faces):
                # Resize the extracted face to have a maximum height or width of 224 while preserving the aspect ratio
                h, w, _ = face.shape
                if h > w:
                    scale = 224 / h
                else:
                    scale = 224 / w
                new_h, new_w = int(h * scale), int(w * scale)
                face = cv2.resize(face, (new_w, new_h))

                # Add padding to the image to make it 224x224
                top = (224 - new_h) // 2
                bottom = 224 - new_h - top
                left = (224 - new_w) // 2
                right = 224 - new_w - left
                face = cv2.copyMakeBorder(face, top, bottom, left, right, cv2.BORDER_CONSTANT, value=(0, 0, 0))

                # Convert the RGB image to BGR format before saving it
                face_bgr = cv2.cvtColor(face, cv2.COLOR_RGB2BGR)

                # Prepare image data to be used as model input
                img = tf.keras.preprocessing.image.img_to_array(face_bgr)   # face_bgr
                img = np.expand_dims(img, axis=0)
                img = tf.cast(img, dtype=tf.float32)

                # Use model 1 to make a prediction on the preprocessed faces
                pred1 = model(img)

                # Use model 2 to make a prediction on the preprocessed faces
                # pred2 = model2(img)

                # Compute the average prediction of the two models
                # ensemble_preds = np.mean([pred1, pred2], axis=0)

                # predictions = model(img)
                predicted_class_index = np.argmax(pred1[0]) # pred1[0]
                predicted_class_name = class_names[predicted_class_index]
                predicted_class_prob = pred1[0][predicted_class_index] # pred1[0]
                
                if predicted_class_prob > confidence_threshold:
                    predicted_class_name = class_names[predicted_class_index]
                    print(f"Predicted class: {predicted_class_name}, Probability: {predicted_class_prob:.2f}")

        
        # Show frame with bounding boxes
        cv2.imshow('Live Face Detection', frame)

        # Press 'q' to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release webcam and close window
    webcam.release()
    cv2.destroyAllWindows()


test_retina()