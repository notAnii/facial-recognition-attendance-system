from keras_preprocessing.image import ImageDataGenerator
import mtcnn
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.image
import numpy as np
import os
import PIL
import pathlib
import tensorflow as tf
from tensorflow import keras
from keras import layers
from tensorflow.python.keras.layers import Dense, Flatten
from keras.models import Sequential
from keras.optimizers import Adam
from keras.callbacks import ModelCheckpoint, EarlyStopping
from keras.models import load_model
from datetime import datetime
import cv2
import sys
import mtcnn

# --------------------------------------------------------------------------------------------------------------

def crop_faces():

  start = datetime.now()

  # Define the path to the parent folder of the dataset
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

                          # Scale the extracted face to a larger size using interpolation
                          # factor = 2
                          # new_width = int(extracted_face.shape[1] * factor)
                          # new_height = int(extracted_face.shape[0] * factor)
                          # extracted_face = cv2.resize(extracted_face, (new_width, new_height), interpolation=cv2.INTER_CUBIC)
                      
                          # Save the extracted face as a new image file
                          output_filename = os.path.join(class_faces_folder_path, f"{os.path.splitext(filename)[0]}_cropped{i+1}.jpg")
                          cv2.imwrite(output_filename, extracted_face)

  duration = datetime.now() - start
  print("Extracting faces completed in time: ", duration)


# crop_faces()

# --------------------------------------------------------------------------------------------------------------

# preparing data
num_classes = 5                # value is the number of folders in dataset folder

img_height,img_width=224,224
batch_size=64                   # can experiment with


# # defining data generators with augmentation        ||  if using data aug: remove validation_split from train_ds and val_ds
# train_datagen = ImageDataGenerator(
#     rescale = 1./255,
#     rotation_range = 20,
#     zoom_range = 0.15,
#     width_shift_range = 0.2,
#     height_shift_range = 0.2,
#     shear_range = 0.15,
#     horizontal_flip = True,
#     fill_mode = 'nearest',
#     validation_split=0.2
# )

# val_datagen = ImageDataGenerator(
#     rescale = 1./255,
#     validation_split=0.2
# )

# Loading data from directories
train_ds = tf.keras.preprocessing.image_dataset_from_directory(     # for data aug:  train_ds=train_datagen.flow_from_directory
  'extracted_faces',
  validation_split=0.2,         # can experiment with
  subset="training",
  seed=123,
  image_size=(img_height, img_width),       # change to target_size from image_size if using data augmentation above
  batch_size=batch_size,
  # class_mode='sparse'
  )

val_ds = tf.keras.preprocessing.image_dataset_from_directory(       # for data aug:  val_ds=val_datagen.flow_from_directory
  'extracted_faces',
  validation_split=0.2,         # can experiment with
  subset="validation",
  seed=123,
  image_size=(img_height, img_width),       # change to target_size from image_size if using data augmentation above
  batch_size=batch_size,
  # class_mode='sparse'
  )

# Printing names of folders (students) in dataset
class_names = train_ds.class_names          # change to train_ds.class_indices if using data augmentation
print(class_names)

# Creating model
resnet_model = Sequential()

pretrained_model= tf.keras.applications.ResNet50(include_top=False,
                   input_shape=(224,224,3),
                   pooling='avg',classes=num_classes,
                   weights='imagenet')
for layer in pretrained_model.layers:
        layer.trainable=False

resnet_model.add(pretrained_model)
resnet_model.add(Flatten())
resnet_model.add(Dense(512, activation='relu'))                 # can add more layers if adding more data to model
resnet_model.add(Dense(num_classes, activation='softmax'))

resnet_model.summary()

# Compiling model
# can experiment with learning_rate
# if using data aug: change "loss" variable to 'categorical_crossentropy'
resnet_model.compile(optimizer=Adam(learning_rate=0.001),loss='sparse_categorical_crossentropy',metrics=['accuracy'])

# Training model
start = datetime.now()

epochs=10                       # can experiment with (number of iterations through dataset)
history = resnet_model.fit(
#   train_generator,
#   validation_data=validation_generator,
  train_ds,
  validation_data=val_ds,
#   validation_split=0.2,
  # steps_per_epoch=23,
  # validation_steps=23,
  epochs=epochs
)

resnet_model.save("extracted_model")

duration = datetime.now() - start
print("Training completed in time: ", duration)

# Evaluating the model
fig1 = plt.gcf()
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.axis(ymin=0.4,ymax=1)
plt.grid()
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epochs')
plt.legend(['train', 'validation'])
plt.show()

plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.grid()
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epochs')
plt.legend(['train', 'validation'])
plt.show()