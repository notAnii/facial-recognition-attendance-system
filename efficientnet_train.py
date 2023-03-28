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
from keras import layers, regularizers
from tensorflow.python.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from keras.models import Sequential
from keras.optimizers import Adam
from keras.callbacks import ModelCheckpoint, EarlyStopping
from keras.models import load_model
from datetime import datetime
import cv2
import sys
from keras.optimizers import RMSprop

# ...
# (Keep the previous code for cropping faces and preparing data)
# ...


# preparing data
num_classes = 5                # value is the number of folders in dataset folder

img_height,img_width=224,224
batch_size=64  

# # defining data generators with augmentation        ||  if using data aug: remove validation_split from train_ds and val_ds
# train_datagen = ImageDataGenerator(
#     horizontal_flip=True,
#     rotation_range=10,
#     brightness_range=[0.7, 1.3],
#     # width_shift_range=0.1,
#     # height_shift_range=0.1,
#     # zoom_range=0.1,
#     fill_mode='nearest',
#     validation_split=0.15
# )

# val_datagen = ImageDataGenerator(
#     # rescale = 1./255,
#     validation_split=0.15
# )

# Load the data using the data generators
train_ds = tf.keras.preprocessing.image.ImageDataGenerator(
    validation_split=0.15,
    # zoom_range=(0.6, 1.2)
).flow_from_directory(
    'student_dataset_extracted_sp_ar_nofar',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='sparse',
    subset='training',
    shuffle=True,
    seed=123
)

val_ds = tf.keras.preprocessing.image.ImageDataGenerator(
    validation_split=0.15,
).flow_from_directory(
    'student_dataset_extracted_sp_ar_nofar',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='sparse',
    subset='validation',
    shuffle=False,
    seed=123
)

test_ds = tf.keras.preprocessing.image.ImageDataGenerator(
    validation_split=0.15,
).flow_from_directory(
    'student_dataset_extracted_sp_ar_nofar',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='sparse',
    subset='validation',
    shuffle=False,
    seed=123
)



# Model architecture and compilation remain unchanged

# Printing names of folders (students) in dataset
class_names = train_ds.class_indices       # change to train_ds.class_indices if using data augmentation
print(class_names)


efficientnet_model = Sequential()

pretrained_model = tf.keras.applications.EfficientNetB0(include_top=False,
                   input_shape=(224, 224, 3),
                   pooling='avg', classes=num_classes,
                   weights='imagenet')

for layer in pretrained_model.layers:
    layer.trainable = False

efficientnet_model.add(pretrained_model)
efficientnet_model.add(Flatten())
efficientnet_model.add(Dropout(0.5))  # add dropout layer with a rate to prevent overfitting
efficientnet_model.add(Dense(512, activation='relu', kernel_regularizer=regularizers.l2(0.01)))  # add L2 regularization
efficientnet_model.add(Dropout(0.5))  # add another dropout layer
efficientnet_model.add(Dense(num_classes, activation='softmax', kernel_regularizer=regularizers.l2(0.01)))

efficientnet_model.summary()

# Compiling model
efficientnet_model.compile(optimizer=RMSprop(learning_rate=0.001),
                           loss='sparse_categorical_crossentropy',
                           metrics=['accuracy'])

# Training model
start = datetime.now()

epochs = 30  # can experiment with (number of iterations through dataset)
history = efficientnet_model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=epochs
)

tf.saved_model.save(efficientnet_model, 'efficientnet_model_2')

duration = datetime.now() - start
print("Training completed in time: ", duration)

# Evaluating the model
fig1 = plt.gcf()
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.axis(ymin=0.4, ymax=1)
plt.grid()
plt.title('Model accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Train', 'Val'], loc='upper left')
plt.savefig('EfficientNetB0_model_accuracy.png')
plt.show()

fig2 = plt.gcf()
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.axis(ymin=0, ymax=3)
plt.grid()
plt.title('Model loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Train', 'Val'], loc='upper right')
plt.savefig('EfficientNetB0_model_loss.png')
plt.show()

# Testing the model
test_loss, test_acc = efficientnet_model.evaluate(test_ds, verbose=2)
print('\nTest accuracy:', test_acc)

