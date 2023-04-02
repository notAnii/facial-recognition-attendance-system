<h1 align="center">Next.js Chakra UI Template</h1>

<div align="center">

</div>

<div align="center">

[![CodeFactor](https://www.codefactor.io/repository/github/imadatyatalah/cna-chakra-ui-template/badge?style=for-the-badge)](https://www.codefactor.io/repository/github/imadatyatalah/cna-chakra-ui-template)
[![MIT License](https://img.shields.io/github/license/imadatyatalah/cna-chakra-ui-template?color=blue&style=for-the-badge)](https://github.com/imadatyatalah/cna-chakra-ui-template/blob/main/LICENSE)
[![Stargazers](https://img.shields.io/github/stars/imadatyatalah/cna-chakra-ui-template?style=for-the-badge)](https://github.com/imadatyatalah/cna-chakra-ui-template/stargazers)
[![Forks](https://img.shields.io/github/forks/imadatyatalah/cna-chakra-ui-template?style=for-the-badge)](https://github.com/imadatyatalah/cna-chakra-ui-template/network/members)

</div>

### Built With
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)


### Screenshot
![Screenshot](./image.png)

## Getting Started

Clone the repository (FrontEnd) that was created on our account and run the following commands in the terminal:

```bash
# Installing npm
npm install -g npm
# Installing node.js
https://nodejs.org/en/download
# Making sure npm and node.js is installed
node -v
npm -v
# Installing yarn
sudo npm install -g yarn
# Making sure yarn is installed
yarn --version
# installing the libraries needed for the project
yarn install
# Starting the project
yarn dev
```

The web app is now running at [`http://localhost:3000`](http://localhost:3000)!

## License
Distributed under the MIT License. See [`LICENSE`](https://github.com/imadatyatalah/cna-chakra-ui-template/blob/main/LICENSE) for more information.

## The web app
After running the previous commands and the web app is running in the browser, the first thing you will see is:

### Landing page
![landing](https://user-images.githubusercontent.com/107717142/229353047-ac59c2d1-e73f-4594-a691-407c4345fd17.png)

This landing page provides a brief summary of what the web app is all about. If the teacher wants to log in, they need to click the "Log-in" button on the top right. After that, they will be directed to the login page.

### Teacher log in page:
![login](https://user-images.githubusercontent.com/107717142/229353299-1d9ae4d9-c1a4-41a3-adaa-ec926362268d.png)

To log in as a teacher, please enter `123` in the username text field and `abshir` for the password.

To log in as another teacher please enter `456` in the username text field and `naruto` for the password.

After successfully logging in, you will be directed to the teacher dashboard page.

### Teacher dashboard page:
![1](https://user-images.githubusercontent.com/107717142/229368554-7d482533-f9fe-4193-a75b-bce4a92b46e2.png)

On this page, you will see the teacher's name, their department, and their position. On the right-hand side, there is a bar graph that displays the number of classes per day on the `y-axis` and the days of the week on the `x-axis`. 

At the bottom of the page, the upcoming classes of the day are displayed. There is no classes displayed because this screenshot was taken on sunday which is a holiday.

Clicking on the email on the sidebar will open a new tab on the browser and direct you to your email.

### Teacher's email page:
![mail2](https://user-images.githubusercontent.com/107717142/229353920-f6106252-114f-4978-b719-7d6580a5dd07.png)

The final section and the most important one is the:

### Teacher classes page
![classes](https://user-images.githubusercontent.com/107717142/229355285-0294a68e-e864-4b80-8873-3b349d2062b0.png)

On this page, all the classes that the teacher is teaching are displayed on the screen, along with additional details like subject name, time, and more. The teacher can use the search bar at the top to search the classes by day.

### Search by day:
![searchByDay](https://user-images.githubusercontent.com/107717142/229355915-554a378a-23aa-4ad7-a08e-edbb1e1aa4b8.png)

Beside each class, there are two options: `View attendance` and `Start attendance`.

When you click `View attendance`, this page will be displayed:

### View attendance page
![viewAttendance](https://user-images.githubusercontent.com/107717142/229355581-b7f88953-3d1a-4822-a975-ae43144ebd6f.png)

On this page, all the students' attendance that was recorded in the class in week 1 will be listed on the screen. If you want to check the students' attendance for a different week, you can click the arrows at the bottom left of the screen.
![moveWeeks](https://user-images.githubusercontent.com/107717142/229355750-b6594e93-99bd-49ca-8920-29a5ce7890be.png)

Additionally, the teacher will be able to filter the list by present, absent, or excused students.
![viewAttendance2](https://user-images.githubusercontent.com/107717142/229355784-e807fc32-df02-49d4-859f-cf620e133c14.png)

If a student has more than 3 absences:

![4](https://user-images.githubusercontent.com/107717142/229369282-2daa8bc8-aee1-4ade-9134-54b5c44d1a66.png)

An email will be sent automatically to that student saying that he\she failed the subject:

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

Attendance recording will then begin:
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

Now let's move on to the students:
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

This concludes the overview of the web application. We hope that this web app will help improve the efficiency of schools/universities.

Thank you,

Kaisen.

<img src="https://user-images.githubusercontent.com/107717142/229359393-75939ad4-2a2d-456f-a29b-6a1f3237337b.png" alt="logo" width="10%" height="10%">
