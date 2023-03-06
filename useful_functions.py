import cv2
import os
import time
from facenet_pytorch import MTCNN
import mtcnn

def take_pics():
    webcam = cv2.VideoCapture(0)
    img_counter = 0
    path = 'My_dataset/6698360' #directory to where photos are saved
    delay = 3 #delay between pictures
    max_images = 100 #maximum number of images to capture
    last_capture_time = time.monotonic()

    while img_counter < max_images:
        ret, frame = webcam.read()
        counter = len(os.listdir(path))

        if not ret:
            print("failed to take picture")
            break

        cv2.imshow("test", frame)
        k = cv2.waitKey(1)

        elapsed_time = time.monotonic() - last_capture_time
        if elapsed_time >= delay:
            img_name = "my_face{}.png".format(counter) 
            cv2.imwrite(os.path.join(path, img_name), frame)
            print("Face captured")
            counter += 1
            img_counter += 1
            last_capture_time = time.monotonic()
        
        if k%256 == 27: #press esc key to close webcam capture
            print("Capturing finished")
            break
        
    webcam.release()
    cv2.destroyAllWindows()

# take_pics()
# ------------------------------------------------------------------------------------------------------------------

def find_faces_in_directory(dir_path):
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

# Path to directory containing images
dir_path = 'Datasets/6698360/'
# find_faces_in_directory(dir_path)

# ------------------------------------------------------------------------------------------------------------------

def live_face_detection():
    # Initialize MTCNN for face detection
    mtcnn_detector = MTCNN()

    # Initialize webcam
    webcam = cv2.VideoCapture(0)

    # Run loop for live face detection
    while True:
        # Capture frame from webcam
        ret, frame = webcam.read()

        # Detect faces using MTCNN
        boxes, _ = mtcnn_detector.detect(frame)

        # Draw bounding boxes around detected faces
        if boxes is not None:
            for box in boxes:
                x1, y1, x2, y2 = box.astype('int')
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Show frame with bounding boxes
        cv2.imshow('Live Face Detection', frame)

        # Press 'q' to exit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release webcam and close window
    webcam.release()
    cv2.destroyAllWindows()

# live_face_detection()


