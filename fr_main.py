# Imports
from keras.applications import VGG16
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten, GlobalAveragePooling2D
from keras.layers import Conv2D, MaxPooling2D, ZeroPadding2D
from keras.layers.normalization import batch_normalization
from keras.models import Model
from keras_preprocessing.image import ImageDataGenerator
from keras.optimizers import RMSprop
from keras.callbacks import ModelCheckpoint, EarlyStopping
from keras.models import load_model
import cv2
import numpy as np
import os
from os import listdir
from os.path import isfile, join

# CODE ------------------------

# Freezing layers
rows = 224
cols = 224

model = VGG16(weights = 'imagenet', include_top = False, input_shape = (rows, cols, 3))

for layer in model.layers:
    layer.trainable = False

for (i, layer) in enumerate(model.layers):
    print(str(i) + " " + layer.__class__.__name__, layer.trainable)

# Adding new fully connected layers
def addLayer(bottom_model, num_classes):
    # creates the head of the model that will be placed on top of the bottom layers
    top_model = bottom_model.output
    top_model = GlobalAveragePooling2D()(top_model)
    top_model = Dense(1024, activation = 'relu')(top_model)
    top_model = Dense(1024, activation = 'relu')(top_model)
    top_model = Dense(512, activation = 'relu')(top_model)
    top_model = Dense(num_classes, activation = 'softmax')(top_model)

    return top_model


print(model.input)

num_classes = 4
fc_head = addLayer(model, num_classes)
new_model = Model(inputs = model.input, outputs = fc_head)
print(new_model.summary())

# Loading data and training the model
train_data_dir = (r"Headshots")
validation_data_dir = (r"Validation_Headshots")

train_datagen = ImageDataGenerator(rescale=1./255,
                                   rotation_range=20,
                                   width_shift_range=0.2,
                                   height_shift_range=0.2,
                                   horizontal_flip=True,
                                   fill_mode='nearest')

validation_datagen = ImageDataGenerator(rescale=1./255)

train_batchsize = 12
validation_batchsize = 10

train_generator = train_datagen.flow_from_directory(train_data_dir,
                                                    target_size=(rows, cols),
                                                    batch_size=train_batchsize,
                                                    class_mode='categorical')

validation_generator = validation_datagen.flow_from_directory(validation_data_dir,
                                                    target_size=(rows, cols),
                                                    batch_size=validation_batchsize,
                                                    class_mode='categorical',
                                                    shuffle=False)

checkpoint = ModelCheckpoint("face_recog_vgg.h5", monitor="val_loss", mode="min", save_best_only=True, verbose=1)
earlystop = EarlyStopping(monitor='val_loss', min_delta=0, patience=3, verbose=1, restore_best_weights=True)
callbacks = [earlystop, checkpoint]

new_model.compile(loss='categorical_crossentropy', optimizer=RMSprop(learning_rate=0.001), metrics=['accuracy'])

nb_train_samples = 1190
nb_validation_samples = 170
epochs = 4
batch_size = 32  # what value should be put here?

history = new_model.fit(train_generator,
                        # steps_per_epoch=nb_train_samples // batch_size,
                        epochs=epochs,
                        callbacks=callbacks,
                        validation_data=validation_generator,
                        # validation_steps=nb_validation_samples // batch_size)
)

new_model.save("face_recog_vgg.h5")

# Testing the model
classifier = load_model('face_recog_vgg.h5')

actors_dataset_dict = {"[0]": "Ismail",
                       "[1]": "Layton",
                       "[2]": "Ronaldo",
                       "[3]": "Tashlin"}

def draw_test(name, pred, im):
    actors = actors_dataset_dict[str(pred)]
    BLACK = [0, 0, 0]
    expanded_image = cv2.copyMakeBorder(im, 80, 0, 0, 100, cv2.BORDER_CONSTANT, value=BLACK)
    cv2.putText(expanded_image, actors, (0, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    cv2.imshow(name, expanded_image)

def getRandomImage(path):
    # function loads random images from a random folder in our test path
    folders = list(filter(lambda x: os.path.isdir(os.path.join(path, x)), os.listdir(path)))
    random_directory = np.random.randint(0, len(folders))
    path_class = folders[random_directory]
    print("Class - " + str(path_class))
    file_path = path + path_class
    file_names = [f for f in listdir(file_path) if isfile(join(file_path, f))]
    random_file_index = np.random.randint(0, len(file_names))
    image_name = file_names[random_file_index]

    return cv2.imread(file_path + "/" + image_name)

input_im = getRandomImage(r"Validation_Headshots" + "//")
input_original = input_im.copy()
input_original = cv2.resize(input_original, None, fx = 0.5, fy = 0.5, interpolation = cv2.INTER_LINEAR)

input_im = cv2.resize(input_im, (224, 224), interpolation = cv2.INTER_LINEAR)
input_im = input_im / 255.
input_im = input_im.reshape(1, 224, 224, 3)

# Get prediction
res = np.argmax(classifier.predict(input_im, 1, verbose = 0), axis = 1)

# Show image with predicted class
draw_test("Prediction", res, input_original)
cv2.waitKey(5000)
cv2.destroyAllWindows()