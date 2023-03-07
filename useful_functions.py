import cv2
import os
import time
from facenet_pytorch import MTCNN
import mtcnn
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.image
import numpy as np

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