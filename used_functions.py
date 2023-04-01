import cv2
import os
import time
import numpy as np
import mtcnn
from keras.models import load_model
from datetime import datetime

# ------------------------------------------------------------------------------------------------------------------

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


# ------------------------------------------------------------------------------------------------------------------

def rename_pics():

    # This function was used to rename all the pictures in the student_dataset

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


# -------------------------------------------------------------------------------------------------------------

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


# -------------------------------------------------------------------------------------------------------------

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


# -------------------------------------------------------------------------------------------------------------

def crop_faces():

  start = datetime.now()

  # Define the path to the parent folder of the dataset that you want to crop faces from
  dataset_path = 'student_dataset'

  # Define the path for the folder to put extracted images
  faces_folder_path = 'extracted_faces'

  # Create the folder to put extracted images if it does not already exist
  if not os.path.exists(faces_folder_path):
      os.makedirs(faces_folder_path)

  # Initialize the MTCNN detector
  detector = mtcnn.MTCNN()

  # Minimum confidence level for face detection
  confidence_threshold = 0.85

  # Size of the extracted face images
  face_size = (224, 224)

  # Loop through each directory in the dataset path
  for dir_name in os.listdir(dataset_path):
      
      # Check if the current item is a directory
      if os.path.isdir(os.path.join(dataset_path, dir_name)):
          
          # Define the path for the class faces folder
          class_faces_folder_path = os.path.join(faces_folder_path, dir_name)
          
          # Create the class faces folder if it does not already exist
          if not os.path.exists(class_faces_folder_path):
              os.makedirs(class_faces_folder_path)
          
          # Loop through each file in the current directory
          for filename in os.listdir(os.path.join(dataset_path, dir_name)):
              
              # Check if the file is a jpg or png image
              if filename.endswith('.jpg') or filename.endswith('.png'):
                  
                  # Read the image file
                  image=cv2.imread(os.path.join(dataset_path, dir_name, filename))

                  # Detect faces in the image using MTCNN
                  faces = detector.detect_faces(image)

                  # Loop through each detected face
                  for i, face in enumerate(faces):
                      if face['confidence'] >= confidence_threshold:
                          # Get the bounding box coordinates for the current face
                          x1, y1, width, height = face['box']
                          x2, y2 = x1 + width, y1 + height
                          
                          # Extract the face from the image using the bounding box coordinates
                          extracted_face = image[y1:y2, x1:x2]

                          # Resize the extracted face to the specified size
                          resized_face = cv2.resize(extracted_face, face_size, interpolation=cv2.INTER_CUBIC)
                      
                          # Save the extracted face as a new image file
                          output_filename = os.path.join(class_faces_folder_path, f"{os.path.splitext(filename)[0]}_cropped{i+1}.jpg")
                          cv2.imwrite(output_filename, resized_face)

  duration = datetime.now() - start
  print("Extracting faces completed in time: ", duration)


# -------------------------------------------------------------------------------------------------------------

# Function calls
# take_pics()
# rename_pics()
# find_faces_in_directory("path/to/directory/")
# make_prediction_on_images_in_dir("dir_path", "img_height", "img_width")
# crop_faces()