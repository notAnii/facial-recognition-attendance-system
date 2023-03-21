import cv2
import os
import time
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.image
import numpy as np
import tensorflow as tf
import mtcnn            # for using mtcnn.MTCNN() `detect_faces()`
import numpy as np
from keras.models import load_model
from datetime import datetime
from facenet_pytorch import MTCNN       # for using MTCNN() `detect()`

# ------------------------------------------------------------------------------------------------------------------

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

# ------------------------------------------------------------------------------------------------------------------

def take_pics():
    webcam = cv2.VideoCapture(0)
    img_counter = 0
    path = 'My_dataset/6698360' #directory to where photos are saved
    delay = 3 #delay between pictures
    max_images = 250 #maximum number of images to capture
    last_capture_time = time.monotonic()

    while img_counter < max_images:
        ret, frame = webcam.read()
        counter = len(os.listdir(path))

        if not ret:
            print("failed to take picture")
            break

        cv2.imshow("test", frame)
        k = cv2.waitKey(1)

        elapsed_time = time.monotonic() - last_capture_time
        if elapsed_time >= delay:
            img_name = "my_face{}.png".format(counter) 
            cv2.imwrite(os.path.join(path, img_name), frame)
            print("Face captured")
            counter += 1
            img_counter += 1
            last_capture_time = time.monotonic()
        
        if k%256 == 27: #press esc key to close webcam capture
            print("Capturing finished")
            break
        
    webcam.release()
    cv2.destroyAllWindows()

# take_pics()

# ------------------------------------------------------------------------------------------------------------------

def rename_pics():
    # Set the directory path containing the images
    directory = "path/to/directory/"

    # Set the prefix for the new filenames
    prefix = "image_"

    # Set the starting number for the new filenames
    start_num = 1

    # Get a list of all the files in the directory
    files = os.listdir(directory)

    # Loop through each file and rename it
    for file in files:
        # Check if the file is an image file
        if file.endswith(".jpg") or file.endswith(".jpeg") or file.endswith(".png"):
            # Get the file extension
            ext = os.path.splitext(file)[1]

            # Generate the new filename
            new_name = prefix + str(start_num) + ext

            # Rename the file
            os.rename(os.path.join(directory, file), os.path.join(directory, new_name))

            # Increment the start number
            start_num += 1

# rename_pics()

# ------------------------------------------------------------------------------------------------------------------

def find_faces_in_directory(dir_path):
    # Initialize MTCNN face detector
    mtcnn_detector = mtcnn.MTCNN()

    # Loop through all images in the directory
    for filename in os.listdir(dir_path):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            # Read image
            image_path = os.path.join(dir_path, filename)
            image = cv2.imread(image_path)

            # Detect faces using MTCNN
            face_roi = mtcnn_detector.detect_faces(image)
            print(face_roi)

            # # extract the bounding box from the first face
            # x1, y1, width, height = face_roi[0]['box']
            # x2, y2 = x1 + width, y1 + height
            # face = image[y1:y2, x1:x2]
            # print(face.shape)

            # mpl.pyplot.imshow(image)
            # mpl.pyplot.show()

            # Display the image
            cv2.imshow('image', image)
            cv2.waitKey(0)

    cv2.destroyAllWindows()

# Path to directory containing images
dir_path = 'test_samples/'
find_faces_in_directory(dir_path)

# -------------------------------------------------------------------------------------------------------------

def load_fr_model():
    # Load model
    fr_model = load_model("extracted_uni_model")

    return fr_model

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

# -------------------------------------------------------------------------------------------------------------
