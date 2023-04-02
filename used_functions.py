import cv2
import os
import time
import numpy as np
import mtcnn
from retinaface import RetinaFace
from keras.models import load_model
from datetime import datetime

# -------------------------------------------------------------------------------------------------------------------

def take_pics():
    
    # This function was used to take side profiles of every student to be used in the student_dataset

    webcam = cv2.VideoCapture(0)
    img_counter = 0
    path = 'dataset_name/class_name'     # Directory to where pictures are saved
    delay = 3       # Delay (in seconds) between pictures
    max_images = 250        # Maximum number of images to capture
    last_capture_time = time.monotonic()

    # Checks whether the number of pictures taken is less than the maximum number of images specified
    while img_counter < max_images:
        ret, frame = webcam.read()
        counter = len(os.listdir(path))

        if not ret:
            print("Failed to take picture.")
            break

        cv2.imshow("Take Pictures", frame)
        k = cv2.waitKey(1)

        # Checks whether the time that has passed is greater than or equal to the delay and if so then take picture
        elapsed_time = time.monotonic() - last_capture_time
        if elapsed_time >= delay:
            img_name = "face_name{}.png".format(counter) 
            cv2.imwrite(os.path.join(path, img_name), frame)
            print("Face Captured.")
            counter += 1
            img_counter += 1
            last_capture_time = time.monotonic()
        
        if k%256 == 27:     # Press esc key to close webcam capture
            print("Capturing Finished.")
            break
        
    webcam.release()
    cv2.destroyAllWindows()


# -------------------------------------------------------------------------------------------------------------------

def rename_pics():

    # This function was used to rename all the pictures in the student_dataset

    print("Renaming pictures...")

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

    print("Pictures have been renamed.")


# -------------------------------------------------------------------------------------------------------------------

def find_faces_in_directory(dir_path):

    # This function detects faces in a directory

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

            # Display the image
            cv2.imshow('image', image)
            cv2.waitKey(0)

    cv2.destroyAllWindows()


# -------------------------------------------------------------------------------------------------------------------

def make_prediction_on_images_in_dir(dir_path, img_height, img_width):

    # This functions makes predictions on images in a directory

    start = datetime.now()

    print("Loading model...")
    model = load_model("vgg19_model")

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
            print(pred)


    cv2.destroyAllWindows()

    duration = datetime.now() - start
    print("\nPredictions completed in time: ", duration)


# -------------------------------------------------------------------------------------------------------------------

def extract_faces():

    # This function extracts all faces found in a directory and saves those cropped faces in a different directory
    # whilst maintaing aspect ratio

    start = datetime.now()
    print("Extracting faces...")

    # Define the path to the parent folder of the dataset that you want to crop faces from
    root_dir = "test_samples"

    # Define the path for the folder to put the extracted faces in
    output_dir = "student_dataset_extracted"

    # Create the folder to put the extracted faces in if it does not already exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Create a subdirectory in the output directory for each subdirectory in root_dir
        subdir_name = os.path.basename(dirpath)
        subdir_path = os.path.join(output_dir, os.path.relpath(dirpath, root_dir))
        if not os.path.exists(subdir_path):
            os.makedirs(subdir_path)

        face_num = 0

        for filename in filenames:
            if filename.lower().endswith(".png") or filename.lower().endswith(".jpg"):
                img_path = os.path.join(dirpath, filename)
                faces = RetinaFace.extract_faces(img_path=img_path, align=False)

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

                    # Save the resized face as an image in the output directory
                    output_filename = subdir_name + "_extracted_" + str(face_num) + ".jpg"
                    output_path = os.path.join(subdir_path, output_filename)
                    cv2.imwrite(output_path, face_bgr)
                    face_num += 1

    duration = datetime.now() - start
    print("Extracting faces completed in time: ", duration)

    cv2.destroyAllWindows()


# -------------------------------------------------------------------------------------------------------------------

# Function calls
# take_pics()
# rename_pics()
# find_faces_in_directory("path/to/directory/")
# make_prediction_on_images_in_dir("dir_path", 224, 224)
# extract_faces()