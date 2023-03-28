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
from tensorflow.python.keras.layers import Dense, Flatten, Dropout
from keras.models import Sequential
from keras.optimizers import Adam, RMSprop, SGD
from keras.callbacks import ModelCheckpoint, EarlyStopping
from keras.models import load_model
from datetime import datetime
import cv2
import sys

# Training with multiple sizes at the same time one after the other

# preparing data
num_classes = 5
batch_size = 64

# Define a list of image sizes to use
image_sizes = [120, 224, 256, 288]

# Loading data from directories
train_ds = []
val_ds = []

# defining data generators with augmentation        ||  if using data aug: remove validation_split from train_ds and val_ds
train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    zoom_range=[0.5, 1.0],
    brightness_range=[0.2, 1.0],
    validation_split=0.4,
    preprocessing_function=tf.keras.applications.resnet50.preprocess_input
)

val_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    validation_split=0.4,
    # rotation_range=20,
    # zoom_range=0.2,
    # width_shift_range=0.2,
    # height_shift_range=0.2,
    # shear_range=0.2,
    # fill_mode='nearest',
    preprocessing_function=tf.keras.applications.resnet50.preprocess_input
)

for image_size in image_sizes:
    train_ds.append(train_datagen.flow_from_directory(      # tf.keras.preprocessing.image_dataset_from_directory
        'extracted_faces_uni',
        # validation_split=0.4,
        subset="training",
        seed=123,
        shuffle=True,
        target_size=(image_size, image_size),
        batch_size=batch_size
    ))
    
    val_ds.append(val_datagen.flow_from_directory(
        'extracted_faces_uni',
        # validation_split=0.4,
        subset="validation",
        seed=123,
        shuffle=False,
        target_size=(image_size, image_size),
        batch_size=batch_size
    ))

# Printing names of folders (students) in dataset
class_names = train_ds[0].class_indices
print(class_names)

# Creating model
resnet_model = Sequential()

pretrained_model = tf.keras.applications.ResNet50(
    include_top=False,
    input_shape=(None, None, 3),
    pooling='avg',
    classes=num_classes,
    weights='imagenet'
)

for layer in pretrained_model.layers:
    layer.trainable = False

resnet_model.add(pretrained_model)
resnet_model.add(Flatten())
resnet_model.add(Dropout(0.8))
resnet_model.add(Dense(512, activation='relu'))
resnet_model.add(Dense(num_classes, activation='softmax'))

resnet_model.summary()

# Compiling model
resnet_model.compile(
    optimizer=RMSprop(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Training model
start = datetime.now()

epochs = 10

for i in range(len(image_sizes)):
    history = resnet_model.fit(
        train_ds[i],
        validation_data=val_ds[i],
        epochs=epochs
    )

resnet_model.save("extracted_uni_model_daug_sizes_R001")

duration = datetime.now() - start
print("Training completed in time: ", duration)
