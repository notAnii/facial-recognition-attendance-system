import matplotlib.pyplot as plt
import tensorflow as tf
from keras import regularizers
from tensorflow.python.keras.layers import Dense, Flatten, Dropout
from keras.models import Sequential
from keras.optimizers import RMSprop
from datetime import datetime

# --------------------------------------------------------------------------------------------------------------

# Preparing data
num_classes=5                 # Value is the number of folders in the dataset folder

img_height,img_width=224,224
batch_size=64                   # Number of samples processed before the model is updated

# Loading data from directories
train_ds=tf.keras.preprocessing.image_dataset_from_directory(
  'student_dataset',
  validation_split=0.15,
  subset="training",
  seed=123,
  shuffle=True,       # Shuffle order of data during training to prevent memorization and learn general patterns in data better
  image_size=(img_height, img_width),
  batch_size=batch_size,
  )

val_ds=tf.keras.preprocessing.image_dataset_from_directory(
  'student_dataset',
  validation_split=0.15,
  subset="validation",
  seed=123,
  shuffle=False,
  image_size=(img_height, img_width),
  batch_size=batch_size,
  )

test_ds=tf.keras.preprocessing.image_dataset_from_directory(
  'student_dataset',
  validation_split=0.15,
  subset="validation",
  seed=123,
  shuffle=False,
  image_size=(img_height, img_width),
  batch_size=batch_size,
  )

# Printing names of folders (student IDs) in dataset
class_names=train_ds.class_names
print(class_names)

# Creating model
vgg19_model=Sequential(name='VGG19_Model')

# Creating a pre-trained VGG19 model on the imagenet dataset
pretrained_model=tf.keras.applications.VGG19(include_top=False,
                   input_shape=(224,224,3),
                   pooling='avg',classes=num_classes,
                   weights='imagenet')

# Freeze the weights of the pre-trained layers
for layer in pretrained_model.layers:
        layer.trainable=False

# Define the VGG19 model architecture
vgg19_model.add(pretrained_model)
vgg19_model.add(Flatten())
vgg19_model.add(Dropout(0.5))  # Add dropout layer with a rate to prevent overfitting
 # Can add more Dense layers if adding more data to model
vgg19_model.add(Dense(512, activation='relu', kernel_regularizer=regularizers.l2(0.01)))  # Add L2 regularization to prevent overfitting
vgg19_model.add(Dropout(0.5))
vgg19_model.add(Dense(num_classes, activation='softmax', kernel_regularizer=regularizers.l2(0.01)))

vgg19_model.summary()

# Compiling model
vgg19_model.compile(optimizer=RMSprop(learning_rate=0.001),loss='sparse_categorical_crossentropy',metrics=['accuracy'])

# Training model
start = datetime.now()

epochs=40         # Number of iterations through the dataset
history = vgg19_model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=epochs
)

# Save model
vgg19_model.save("vgg19_model2")

duration = datetime.now() - start
print("Training completed in time: ", duration)

# Evaluating model
fig1 = plt.gcf()
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.axis(ymin=0.4, ymax=1)
plt.grid()
plt.title('Model accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Train', 'Val'], loc='upper left')
plt.savefig('VGG19_model_accuracy.png')
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
plt.savefig('VGG19_model_loss.png')
plt.show()

# Testing model
test_loss, test_acc = vgg19_model.evaluate(test_ds, verbose=2)
print('\nTest accuracy:', test_acc)