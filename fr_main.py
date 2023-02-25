# import tensorflow as tf
# import keras
# from keras.layers import Flatten, Dense, Input
from keras_preprocessing.image import ImageDataGenerator
# import keras_vggface
# from keras_vggface.vggface import VGGFace
import mtcnn
# import numpy as np
import matplotlib as mpl
# import matplotlib.image
# import matplotlib.pyplot
# from keras.utils.data_utils import get_file
# import keras_vggface.utils
# import PIL
# import os
# import os.path
# from datetime import datetime
# import cv2
# import sys

# # vggface_resnet = VGGFace(model='resnet50')
# # print(vggface_resnet.summary())
# # print('Inputs: ', vggface_resnet.inputs)
# # print('Outputs: ', vggface_resnet.outputs)


# train_dataset = keras.utils.image_dataset_from_directory('real_and_fake_face',
#     shuffle=True,
#     batch_size = 64,
#     image_size = (224, 224)
# )

# # sample_dataset = keras.utils.image_dataset_from_directory('samples',
# #     shuffle=True,
# #     batch_size = 8,
# #     image_size = (224, 224)
# # )

# data_augmentation = keras.Sequential([
#     keras.layers.RandomFlip('horizontal'),
#     keras.layers.RandomRotation(0.2)
# ])                               

# vggface_resnet_base = VGGFace(model='resnet50', include_top=False, input_shape=(224, 224, 3))

# num_classses = 3

# # freeze base model
# vggface_resnet_base.trainable = False
# last_layer = vggface_resnet_base.get_layer('avg_pool').output

# # build new model
# inputs = tf.keras.Input(shape=(224, 224, 3))
# x = data_augmentation(inputs)
# x = vggface_resnet_base(x)
# x = Flatten(name='flatten')(x)
# out = Dense(num_classses, name='classifier')(x)

# custom_resnet_model = keras.Model(inputs, out)
# custom_resnet_model.summary()

# base_lr = 0.0001

# custom_resnet_model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=base_lr),
#     loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True),
#     metrics=['accuracy']
# )

# start = datetime.now()

# history = custom_resnet_model.fit(train_dataset, epochs=80)

# duration = datetime.now() - start
# print("Training completed in time: ", duration)

# # # load image from file
# # photo = mpl.image.imread('samples/class_1/httpabsolumentgratuitfreefrimagesbenaffleckjpg.jpg')
# # photo.shape

# # face_detector = mtcnn.MTCNN()
# # face_roi = face_detector.detect_faces(photo)
# # print(face_roi)

# # # extract the bounding box from the first face
# # x1, y1, width, height = face_roi[0]['box']
# # x2, y2 = x1 + width, y1 + height
# # face = photo[y1:y2, x1:x2]
# # print(face.shape)

# # mpl.pyplot.imshow(photo)
# # mpl.pyplot.show()

# # prob_model = keras.Sequential([
# #     custom_resnet_model,
# #     tf.keras.layers.Softmax()
# # ])

# # predictions = prob_model.predict(sample_dataset)
# # print(predictions)
# # # names = keras_vggface.utils.decode_predictions(predictions)
# # # print(names)

# # webcam stuff
# cap = cv2.VideoCapture(0)

# # check if the webcam is opened correctly
# if not cap.isOpened():
#     raise IOError("Cannot open webcam.")

# while True:
#     ret, frame = cap.read()
#     frame = cv2.resize(frame, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA)
#     cv2.imshow('Input', frame)

#     cv2.imwrite('samples/class_1/webcam_capture.jpg', frame)

#     c = cv2.waitKey(1)
#     if c == 27:
#         break

# cap.release()
# cv2.destroyAllWindows()

# # load image from file
# photo = mpl.image.imread('samples/class_1/webcam_capture.jpg')
# photo.shape

# face_detector = mtcnn.MTCNN()
# face_roi = face_detector.detect_faces(photo)
# print(face_roi)

# # extract the bounding box from the first face
# x1, y1, width, height = face_roi[0]['box']
# x2, y2 = x1 + width, y1 + height
# face = photo[y1:y2, x1:x2]
# print(face.shape)

# mpl.pyplot.imshow(photo)
# mpl.pyplot.show()

# prob_model = keras.Sequential([
#     custom_resnet_model,
#     tf.keras.layers.Softmax()
# ])

# sample_dataset = keras.utils.image_dataset_from_directory('samples',
#     shuffle=True,
#     batch_size = 16,
#     image_size = (224, 224)
# )

# predictions = prob_model.predict(sample_dataset)
# print(predictions)
# # names = keras_vggface.utils.decode_predictions(predictions)
# # print(names)


####################################################################################################################
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

# preparing data
num_classes = 17                # value is the number of folders in dataset folder

img_height,img_width=224,224
batch_size=64                   # can experiment with

train_ds = tf.keras.preprocessing.image_dataset_from_directory(
  'celeb_faces_dataset',
  validation_split=0.2,         # can experiment with
  subset="training",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size)

val_ds = tf.keras.preprocessing.image_dataset_from_directory(
  'celeb_faces_dataset',
  validation_split=0.2,         #can experiment with
  subset="validation",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size)

class_names = train_ds.class_names
print(class_names)

# training model
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

# can experiment with learning_rate
resnet_model.compile(optimizer=Adam(learning_rate=0.0001),loss='sparse_categorical_crossentropy',metrics=['accuracy'])

# # Augmenting images
# data_generator_with_aug = ImageDataGenerator(
#                                 #    rescale=1./255,
#                                    rotation_range=20,
#                                    width_shift_range=0.2,
#                                    height_shift_range=0.2,
#                                    horizontal_flip=True,
#                                    fill_mode='nearest')

# # validation_datagen = ImageDataGenerator(rescale=1./255)

# # Fitting augmentation to images
# train_generator = data_generator_with_aug.flow_from_directory(
#         'celeb_faces_dataset',
#         target_size=(img_height, img_width),
#         batch_size=64,
#         class_mode='sparse')


# validation_generator = data_generator_with_aug.flow_from_directory(
#         'celeb_faces_dataset',
#         target_size=(img_height, img_width),
#         shuffle=False,
#         class_mode='sparse')

start = datetime.now()

epochs=30                       # can experiment with (number of iterations through dataset)
history = resnet_model.fit(
#   train_generator,
#   validation_data=validation_generator,
  train_ds,
  validation_data=val_ds,
#   validation_split=0.2,
  # steps_per_epoch=50,
  # validation_steps=50,
  epochs=epochs
)

duration = datetime.now() - start
print("Training completed in time: ", duration)

# evaluating the model
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

# making predictions
image=cv2.imread('face_rec/test_samples/001_c04300ef.jpg')
image_resized= cv2.resize(image, (img_height,img_width))
image=np.expand_dims(image_resized,axis=0)
print(image.shape)

pred=resnet_model.predict(image)
print(pred)

output_class=class_names[np.argmax(pred)]
print("The predicted class is: ", output_class)