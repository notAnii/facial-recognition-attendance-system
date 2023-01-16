# Imports for preprocessing the images used for training / Extracting faces from images (1)
import cv2 # 1
import os # 1
import pickle # 1
import numpy as np # 1
from PIL import Image # 1

import matplotlib.pyplot as plt # 1

# Imports for training model using faces extracted in previous section (2)
import pandas as pd # 2
import tensorflow.python.keras as keras # 2
from tensorflow.python.keras.layers import Dense, GlobalAveragePooling2D # 2

from keras.preprocessing import image # 2
from keras.applications.mobilenet import preprocess_input # 2
from keras.preprocessing.image import ImageDataGenerator # 2
from keras.models import Model # 2
from keras.optimizers import Adam # 2

# Imports for building the model (3)
from keras_vggface.vggface import VGGFace # 3

# Code -------------

# Preprocessing the images used for training / Extracting faces from images (1)
headshots_folder_name = 'Headshots'

# dimension of images
image_width = 224
image_height = 224

# for detecting faces
facecascade = cv2.CascadeClassifier(r"haarcascade_frontalface_default.xml")

# set the directory containing the images
images_dir = os.path.join("..", headshots_folder_name)

current_id = 0
label_ids = {}

# iterates through all the files in each subdirectories
for root, _, files in os.walk(images_dir):
    for file in files:
        if file.endswith("png") or file.endswith("jpg") or file.endswith("jpeg"):
            # path of the image
            path = os.path.join(root, file)

            # get the label name (name of the person)
            label = os.path.basename(root).replace(" ", ".").lower()

            # add the label (key) and its number (value)
            if not label in label_ids:
                label_ids[label] = current_id
                current_id += 1

            # load the image
            imgtest = cv2.imread(path, cv2.IMREAD_COLOR)
            image_array = np.array(imgtest, "uint8")

            # get the faces detected in the image
            faces = facecascade.detectMultiScale(imgtest,
                scaleFactor=1.1, minNeighbors=5)

            # if not exactly 1 face is detected, skip this photo
            if len(faces) != 1:
                print(f'---Photo skipped---\n')
            # remove the original image
            os.remove(path)
            continue

        # save the detected face(s) and associate
        # them with the label
        for (x_, y_, w, h) in faces:

            # draw the face detected
            face_detect = cv2.rectangle(imgtest,
                    (x_, y_),
                    (x_+w, y_+h),
                    (255, 0, 255), 2)
            plt.imshow(face_detect)
            plt.show()

            # resize the detected face to 224x224
            size = (image_width, image_height)

            # detected face region
            roi = image_array[y_: y_ + h, x_: x_ + w]

            # resize the detected head to target size
            resized_image = cv2.resize(roi, size)
            image_array = np.array(resized_image, "uint8")

            # remove the original image
            os.remove(path)

            # replace the image with only the face
            im = Image.fromarray(image_array)
            im.save(path)


# Augmenting the training images (uses imported libraries (2))
train_datagen = ImageDataGenerator(preprocessing_function=preprocess_input)

train_generator = train_datagen.flow_from_directory(r"Headshots",
target_size=(224,224),
color_mode='rgb',
batch_size=32,
class_mode='categorical',
shuffle=True)

train_generator.class_indices.values()
# dict_values([0, 1, 2])
NO_CLASSES = len(train_generator.class_indices.values())


# Building the model (3)
base_model = VGGFace(include_top=True,      # When 'True', these seven layers represent the three fully connected output layers used to recognize faces.
    # weights=None,
    model='vgg16',
    input_shape=(224, 224, 3))
base_model.summary()

print(len(base_model.layers))
# 26 layers in the original VGG-Face

x = base_model.output
print("this is x: ")
print(x)
x = GlobalAveragePooling2D()(x)

x = Dense(1024, activation='relu')(x)
x = Dense(1024, activation='relu')(x)
x = Dense(512, activation='relu')(x)

# final layer with softmax activation
preds = Dense(NO_CLASSES, activation='softmax')(x)

# # don't train the first 19 layers - 0..18
# for layer in model.layers[:19]:
#     layer.trainable = False

# # train the rest of the layers - 19 onwards
# for layer in model.layers[19:]:
#     layer.trainable = True

