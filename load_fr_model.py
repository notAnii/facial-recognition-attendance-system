import tensorflow as tf
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.image
import mtcnn
import numpy as np
from keras.models import load_model
import cv2

def webcam():   
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


def make_prediction():
    img_height,img_width=224,224

    train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    'celeb_faces_dataset',
    )

    class_names = train_ds.class_names

    # load model
    fr_model = load_model("saved_model")

    # making predictions
    image=cv2.imread('test_samples/007_1f6f632a.jpg')
    image_resized= cv2.resize(image, (img_height,img_width))
    image=np.expand_dims(image_resized,axis=0)
    print(image.shape)

    pred=fr_model.predict(image)
    # pred = np.argmax(resnet_model.predict(image, 1, verbose = 0), axis = 1)
    print(pred)

    output_class=class_names[np.argmax(pred)]
    print("The predicted class is: ", output_class)


# webcam()
make_prediction()