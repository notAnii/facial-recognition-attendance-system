# Automated Attendance System (AAS) - Facial Recognition

This repository contains the files necessary for training the models used to carry out facial recognition.

## Prerequisites

* You need to have Python 3.10.0 installed on your computer. You can download that specific version of Python from the official website.

### Setting Up 'models' Folder

1. Download the two models from the 'models' folder provided in the [Google drive link](https://drive.google.com/drive/folders/1WI4EatTVdM62XLkaHFScegSS7ObV4A5p?usp=share_link).
2. Place the two downloaded models ('vgg19_model' and 'efficientnetb0_model') in the 'models' folder.

## Installation

* Run the requirements.txt file to install the dependencies.
* Use the following command: 'pip install -r requirements.txt'

## Training the model
 
* Run the 'vgg19_train.py' and 'efficientnetb0_train.py' files to train the models

## Running the system

* Run the 'facial_recognition.py' file after training the models to start facial recognition

## Note

* The 'used_functions.py' file contains functions that were used to contribute towards the completed system.
