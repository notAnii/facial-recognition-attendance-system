<h1 align="center">
  <img src="https://user-images.githubusercontent.com/107717142/229359393-75939ad4-2a2d-456f-a29b-6a1f3237337b.png" alt="logo" width="12%" height="12%">
  <br>
  Automated Attendance System (AAS)
</h1>
<h3 align="center">• Efficiency • Integreity • Precision •</h3>



## Description

Automated Attendance System is a software solution designed to streamline the process of tracking attendance in educational institutions or workplaces using facial recognition technology. The system uses a camera to capture an image of each individual's face, and then uses advanced algorithms to identify and match the face with the stored data to record attendance.

The primary objective of this project is to create a more efficient and accurate system for taking attendance that eliminates the need for manual data entry and reduces the workload for instructors or HR personnel. The system can also help to prevent fraudulent attendance, reduce errors, and save time for both students and teachers.


## Built With

The following frameworks and libraries were used to build our Automated Attendance System (AAS):

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Python][Python]][Python-url]
* [![TensorFlow][TensorFlow]][TensorFlow-url]
* [![Keras][Keras]][Keras-url]
* [![opencv][opencv]][opencv-url]
* [![MySQL][MySQL]][MySQL-url]



[Next.js]: https://img.shields.io/badge/next.js-ffffff?style=for-the-badge&logo=nextdotjs&logoColor=61DAFB
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/downloads/release/python-3100/
[TensorFlow]: https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white
[TensorFlow-url]: https://www.tensorflow.org/?gclid=Cj0KCQjw8qmhBhClARIsANAtbodKvpLsluniotEpkfPPg8MgXXyO4coFCnP5NWGbAi208tBP1LesU44aAnAOEALw_wcB
[Keras]: https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white
[Keras-url]: https://keras.io/ 
[opencv]: https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white
[opencv-url]: https://github.com/opencv/opencv
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
## Features

- Teacher
    * Start attendance recording
    * View attendance (student/class)
    * View attendance statistics
    * Filter student attendance based on status (absent/present/excused)
    * View upcoming classes
    * Access email

- Admin
    * Enroll student
    * Edit student classes
    * Assign teacher to class
    * Modify student attendance (override)
    * Modify teacher class (add/remove)


## Prerequisites
Before you begin, you will need to have the following installed and configured on your system:

* Python 3.10.0: You can download and install Python 3.10.0 from the official website: https://www.python.org/downloads/release/python-3100/
* npm and Node.js: You can download and install these from the official website: https://nodejs.org/en/
* Pretrained face recognition models: You will need to download two pretrained face recognition models from the following Google Drive link: [Here](https://drive.google.com/drive/folders/1WI4EatTVdM62XLkaHFScegSS7ObV4A5p?usp=share_link). Once downloaded, you will need to place `vgg19_model` and `efficientnetb0_model` in `backend/face_rec/models/` directory of the project.
* MySQL: You will need to have a MySQL server set up on your system to store data. You can download and install MySQL from the official website: https://dev.mysql.com/downloads/. To fill up database with required data, run the SQL commands present in `backend/api/database/sql.txt`
* A config.py file: You will need to create a config.py file in `backend/api/database/` with the necessary configurations. You can use the provided config.example.py file as a template.

    ```python
        # Database connection settings
        HOST = "<host>"
        USERNAME = "<username>"
        PASSWORD = "<password>"
        DATABASE = "<database>"
    ```
## Getting Started

Clone the project

```shell
  git clone https://github.com/notAnii/facial-recognition-attendance-system
```

Go to the project directory

```shell
  cd facial-recognition-attendance-system
```

### Setting up using bash file
```shell
  ./setup.sh
```
or
```shell
  sh setup.sh
```


### Setting up manually

#### Setup API
Setup and activate virtual environment

```shell
  python -m venv venv
```
```shell
  source venv/Scripts/activate
```

Install python packages

```shell
  pip install requirements.txt
```

#### Setup Client
Install yarn
```shell
  sudo npm install -g yarn
```

Go to the frontend directory
```shell
  cd frontend
```

Install frontend dependencies 
```shell
  yarn install
```

## Running Locally
Go to the project directory

```shell
  cd facial-recognition-attendance-system
```

Start Client and Server

```shell
  ./script.sh
```
or
```shell
  sh script.sh
```

Client runs on http://localhost:3000/
API runs on http://localhost:5000/

## User Guide
After running the previous commands and the web app / API are running successfully, you will be greeted with a landing page

### Landing page
![landing](https://user-images.githubusercontent.com/107717142/229353047-ac59c2d1-e73f-4594-a691-407c4345fd17.png)

This landing page provides a brief summary of what the web app is all about. If the teacher wants to log in, they need to click the "Log-in" button on the top right. After that, they will be directed to the login page.

### Teacher log in page:
![login](https://user-images.githubusercontent.com/107717142/229353299-1d9ae4d9-c1a4-41a3-adaa-ec926362268d.png)

To log in as a teacher, use these placeholder credentials:
```
Username: '123'
Password: 'teacher123'
```

Alternate user:
```
Username: '456'
Password: 'teacher456'
```

After successfully logging in, you will be directed to the teacher dashboard page.

### Teacher dashboard page:
![1](https://user-images.githubusercontent.com/107717142/229368554-7d482533-f9fe-4193-a75b-bce4a92b46e2.png)

On this page, you will see the teacher's name, their department, and their position. On the right-hand side, there is a bar graph that displays the number of classes per day on the `y-axis` and the days of the week on the `x-axis`. 

Clicking on the email on the sidebar will open a new tab on the browser and direct you to your outlook.

### Teacher's email page:
![mail2](https://user-images.githubusercontent.com/107717142/229353920-f6106252-114f-4978-b719-7d6580a5dd07.png)

The final section and the most important one is the:

### Teacher classes page
![classes](https://user-images.githubusercontent.com/107717142/229355285-0294a68e-e864-4b80-8873-3b349d2062b0.png)

On this page, all the classes that the teacher is teaching are displayed on the screen, along with additional details like subject name, time, and more. The teacher can use the search bar at the top to search the classes by day.

### Search by day:
![searchByDay](https://user-images.githubusercontent.com/107717142/229355915-554a378a-23aa-4ad7-a08e-edbb1e1aa4b8.png)

For each class, there are two options: `View attendance` and `Start attendance`.

When you click `View attendance`, this page will be displayed:

### View attendance page
![viewAttendance](https://user-images.githubusercontent.com/107717142/229355581-b7f88953-3d1a-4822-a975-ae43144ebd6f.png)

On this page, all the students' attendance that was recorded in the class in week 1 will be listed on the screen. If you want to check the students' attendance for a different week, you can click the arrows at the bottom left of the screen.

![moveWeeks](https://user-images.githubusercontent.com/107717142/229355750-b6594e93-99bd-49ca-8920-29a5ce7890be.png)

Additionally, the teacher will be able to filter the list by present, absent, or excused students.

![viewAttendance2](https://user-images.githubusercontent.com/107717142/229355784-e807fc32-df02-49d4-859f-cf620e133c14.png)

If a student has more than 3 absences:

![4](https://user-images.githubusercontent.com/107717142/229369282-2daa8bc8-aee1-4ade-9134-54b5c44d1a66.png)

An email will be sent automatically to that student saying that he/she failed the subject:

![image](https://user-images.githubusercontent.com/107717142/229369349-f0a6adb7-d92d-4ba2-83e4-bf43582802d0.png)


### Searching Attendance Records
To search attendance records of a specific student, you can use the search bar on top and search by the student's name or student ID.

### Search by student name:
![searchByStudentName](https://user-images.githubusercontent.com/107717142/229355854-eff84fd3-7eba-4fb7-8d47-673ef75916f7.png)

### Search by student ID:
![searchByStudentID](https://user-images.githubusercontent.com/107717142/229355896-e987a047-fd80-497e-89b3-36b98043dd10.png)

### Recording Attendance
When a teacher starts a class and wants to record attendance, they can click the `Start attendance` button on this page:
![classes](https://user-images.githubusercontent.com/107717142/229355285-0294a68e-e864-4b80-8873-3b349d2062b0.png)

Attendance recording will then begin:</br>
![startAttendance](https://user-images.githubusercontent.com/107717142/229356356-43dcdb93-4947-4b6e-985c-5a0c60ee70d6.png)

On this page, each student who enters the class will be marked as present, and the name of the student will pop up with the attendance percentage in blue, and the time the student's attendance was recorded. If the student's name is not there, then it means that the student is absent. If the student is excused absent, then the admin can change the student's attendance.

This completes the attendance recording process for teachers. To log in as an admin, you need to log out by clicking the teacher's name at the bottom of the sidebar:

![LogOut](https://user-images.githubusercontent.com/107717142/229356593-bc175b03-b6e9-4f84-927b-3fc9d2a54e35.png)

After clicking log out, you will go back to the landing page, and then you will have to click on Admin on the top right:
![landing](https://user-images.githubusercontent.com/107717142/229356638-4dda1433-d6db-4cea-bfae-95fbf15428b8.png)

### Admin log-in
![logIn](https://user-images.githubusercontent.com/107717142/229356683-686c5e7e-723c-4e54-b4dc-e9469bfb31e5.png)

Enter username `112233` and password `admin` to log in. After logging in, this page will be displayed:

### Admin Home page
![home](https://user-images.githubusercontent.com/107717142/229356753-a3e66d3a-399b-400a-996b-58daa7a31eb5.png)

As you can see, the admin has full control of the system, so there are a lot of actions that the admin can perform. We will start with the:

### Assign teacher to class page:
![AssignTeacher](https://user-images.githubusercontent.com/107717142/229356818-9d94493b-d1ba-4eab-9370-4feaa2a22581.png)

To assign a teacher to a class, simply fill in the required details on the Assign teacher to class page, and the teacher will be assigned to another class. In this example, the teacher will be assigned to CSCI369 Friday class. And if the teacher is already assigned to that class, an error message will appear:

![3](https://user-images.githubusercontent.com/107717142/229368924-9b665f06-9f20-4635-b5ba-da0a03443ff0.png)

### Edit teacher classes page:
![EditTeacherClasses](https://user-images.githubusercontent.com/107717142/229356934-c5e2a35e-6645-445a-b1bf-a663d2f97c2b.png)

On this page, you can view all the classes that a teacher is teaching by entering their ID and clicking the search button. Next to each class, you have two options: `Edit` and `Delete`. If you select Edit Teacher Classes, you will be taken to the following page:

### Edit teacher classes page:
![EditTeacherClasses(Edit)](https://user-images.githubusercontent.com/107717142/229357060-c1c80495-073f-42c7-b840-52ad1980d946.png)

On this page, you can edit the teacher's classes by entering the subject code and changing the timing of the class. For example, if the teacher has been assigned to a Friday class by mistake, an administrator can change the class to Monday.

### Delete teacher classes:
![EditTeacherClasses(Delete)](https://user-images.githubusercontent.com/107717142/229357144-9c947f89-80ec-4370-83b6-b09fd13900fc.png)

If you click the Delete button, the class will be removed.

Now let's move on to the students:</br>
![home](https://user-images.githubusercontent.com/107717142/229357203-02c3cebc-f0d3-4e3e-a6b6-bcd48aed3a6e.png)

In the students' section, we have three actions we can take. We will begin with the following:

### Add student to class Page:
![AddStudenttoclass](https://user-images.githubusercontent.com/107717142/229357244-2e5e09fb-9494-4321-a2fd-ae32b609fe47.png)

By filling out the required text fields, you can enroll a student into a class. If the student is already enrolled in that class, an error message will appear, indicating that the student is already enrolled in that class:

![2](https://user-images.githubusercontent.com/107717142/229368851-9c2afa6c-f66e-41ce-b9ee-d90c836172a9.png)


Next, let's check the Edit Student Classes option on the Admin home page:
![home](https://user-images.githubusercontent.com/107717142/229357527-23f0307d-b5f4-4861-bc96-105938ed3bbe.png)

### Edit student classes Page:
![EditStudentClasses](https://user-images.githubusercontent.com/107717142/229357567-ed5cee99-99f2-4ceb-9c38-936c35d31857.png)

On this page, you can view all the classes in which a student is enrolled by entering their ID and clicking the `search` button. Next to each class, you have two options: `Edit` and `Delete`. If you select `Edit` Student Classes, you will be taken to the following page:

### Edit student classes page:
![EditStudentClasses(Edit)](https://user-images.githubusercontent.com/107717142/229357663-93b18cee-6fe8-4768-869e-d1349b6b2997.png)

On this page, you can edit a student's classes by entering the subject code and changing the timing of the class. For example, if a student is enrolled in a Monday class but wants to switch to a Friday class, an administrator can make the change.

### Delete student classes:
![EditStudentClasses(Delete)](https://user-images.githubusercontent.com/107717142/229357646-8aaff3f3-fcfd-4b9c-ab94-ba65cfb581d3.png)

In case a class needs to be removed, the user can click the `Delete` button.

Finally, the last action we can do to a student is edit student attendance:

### Edit student attendance page:
![EditStudentAttendance](https://user-images.githubusercontent.com/107717142/229357893-7182bee1-fbb4-467a-bdc7-b08a153dc961.png)

If a student was absent from the class, the attendance can be marked accordingly. However, if the student was unable to attend due to reasons such as illness or travel, the attendance status can be modified from absent to excused in this page.
