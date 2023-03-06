import tensorflow as tf
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.image
import mtcnn
import numpy as np
from keras.models import load_model
import cv2
import os
from datetime import datetime
from facenet_pytorch import MTCNN

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


def make_prediction():
    # img_height,img_width=224,224

    # train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    # 'celeb_faces_dataset',
    # )

    # class_names = train_ds.class_names

    # load model
    fr_model = load_model("saved_model")

    # # making predictions
    # image=cv2.imread('test_samples/007_1f6f632a.jpg')
    # image_resized= cv2.resize(image, (img_height,img_width))
    # image=np.expand_dims(image_resized,axis=0)
    # print(image.shape)

    # pred=fr_model.predict(image)
    # # pred = np.argmax(resnet_model.predict(image, 1, verbose = 0), axis = 1)
    # print(pred)

    # output_class=class_names[np.argmax(pred)]
    # print("The predicted class is: ", output_class)

    return fr_model


# webcam()
# make_prediction()

# -------------------------------------------------------------------------------------------------------------
def make_prediction_on_images_in_dir(dir_path, img_height, img_width):

    start = datetime.now()

    # Loop through all images in the directory
    for filename in os.listdir(dir_path):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            # Read image
            image_path = os.path.join(dir_path, filename)
            image = cv2.imread(image_path)
            image_resized = cv2.resize(image, (img_height, img_width))
            image = np.expand_dims(image_resized, axis = 0)

            print("Loading model...")
            model = make_prediction()

            print("Making prediction...")
            pred = model.predict(image)
            print(pred)

    cv2.destroyAllWindows()

    duration = datetime.now() - start
    print("Predictions completed in time: ", duration)


dir_path = 'Datasets/6698360/'
# make_prediction_on_images_in_dir(dir_path, 224, 224)


def making_prediction_on_preprocessed_frame():
    # Load the saved ResNet50 model
    model = make_prediction()

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

# making_prediction_on_preprocessed_frame()