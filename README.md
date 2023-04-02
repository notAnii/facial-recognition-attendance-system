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
So after running the previous commands and the web app is running in the browser, thats the first thing you will see:

### Landing page
![landing](https://user-images.githubusercontent.com/107717142/229353047-ac59c2d1-e73f-4594-a691-407c4345fd17.png)

So this landing page gives a brief summary about what the web app is all about. If the teacher wants to log in, then the teacher needs to click the Log-in on the top right, and after that the teacher will be moved to this page:

### Teacher log in page:
![login](https://user-images.githubusercontent.com/107717142/229353299-1d9ae4d9-c1a4-41a3-adaa-ec926362268d.png)
To log in as a teacher Please type `123` in the username textfield and `abshir` for the password.

After you successfully log in you will be moved to this page:
### Teacher dashboard page:
![login](https://user-images.githubusercontent.com/107717142/229353299-1d9ae4d9-c1a4-41a3-adaa-ec926362268d.png)
In this page you will see the teacher's name, their department, and also the consultation hours, on the right hand side you will see a bar graph:
`y-axis` = Number of classes per day
`x-axis` = The days in the week

At the bottom of the page, the upcoming classes of today will be displayed. If the you click the email on the sidebar a new tab on the browser will open and you will be moved to your email:
### Teacher's email page:
![mail2](https://user-images.githubusercontent.com/107717142/229353920-f6106252-114f-4978-b719-7d6580a5dd07.png)

Finally the last section and the most important one is the: 
### Teacher classes page
![classes](https://user-images.githubusercontent.com/107717142/229355285-0294a68e-e864-4b80-8873-3b349d2062b0.png)
In this page all the classes that the teacher is teaching will be displayed in the screen with more details like subject name, time, and ...The teacher has the ability to use the search bar on top to search the classes by day:
### Search by day:
![searchByDay](https://user-images.githubusercontent.com/107717142/229355915-554a378a-23aa-4ad7-a08e-edbb1e1aa4b8.png)
Beside each class there are two options: `View attendance` and `Start attendance`. 

When you click `View attendance` this page will be displayed:
### View attendance page
![viewAttendance](https://user-images.githubusercontent.com/107717142/229355581-b7f88953-3d1a-4822-a975-ae43144ebd6f.png)
In this page all the students' attendance that was recorded in the class in week 1 will be listed in the screen, if you want to check the students' attendance in a different week, you can click the arrows at the button left of the screen:
![moveWeeks](https://user-images.githubusercontent.com/107717142/229355750-b6594e93-99bd-49ca-8920-29a5ce7890be.png)
Other than that, the teacher will be able to filter the list by present, absent, or excused students:
![viewAttendance2](https://user-images.githubusercontent.com/107717142/229355784-e807fc32-df02-49d4-859f-cf620e133c14.png)
Moreover, if the teacher wants to know the attendance of a specific student, then the teacher will be able to use the search bar on top to 
### Search by student name:
![searchByStudentName](https://user-images.githubusercontent.com/107717142/229355854-eff84fd3-7eba-4fb7-8d47-673ef75916f7.png)

### Search by student ID:
![searchByStudentID](https://user-images.githubusercontent.com/107717142/229355896-e987a047-fd80-497e-89b3-36b98043dd10.png)

Moving on, when the teacher starts the  class and wants to start attendance, the teacher can click the `Start attendance` button in this page:
![classes](https://user-images.githubusercontent.com/107717142/229355285-0294a68e-e864-4b80-8873-3b349d2062b0.png)

The attendance recording will start:
![startAttendance](https://user-images.githubusercontent.com/107717142/229356356-43dcdb93-4947-4b6e-985c-5a0c60ee70d6.png)
In this page each student who walks in the class will be marked as present and ther name of the student will pop up with the attendance percentage in blue, and the time the student's attendance was recorded. If the student's name is not there, then it means that the student is absent, and if the student is excused absent then the admin will change the students attendance.

And that is basically it for the teacher's account, now to log in as admin you need to log out by clicking the teacher's name at the bottom of the sidebar:
![LogOut](https://user-images.githubusercontent.com/107717142/229356593-bc175b03-b6e9-4f84-927b-3fc9d2a54e35.png)

After clicking log out you will go back to the landing page, then you will have to click admin on the top right:
![landing](https://user-images.githubusercontent.com/107717142/229356638-4dda1433-d6db-4cea-bfae-95fbf15428b8.png)

### Admin log-in
![logIn](https://user-images.githubusercontent.com/107717142/229356683-686c5e7e-723c-4e54-b4dc-e9469bfb31e5.png)
Enter username `11223344` and password `admin` to log in. AFter logging in this page will be displayed:

### Admin Home page
![home](https://user-images.githubusercontent.com/107717142/229356753-a3e66d3a-399b-400a-996b-58daa7a31eb5.png)
As you can see the admin has full control of the system, so there are alot of actions the admin can you. We will start with the

### Assign teacher to class page:
![AssignTeacher](https://user-images.githubusercontent.com/107717142/229356818-9d94493b-d1ba-4eab-9370-4feaa2a22581.png)
By simply filling the text fields on the screen, the teacher will be assigned to another class, in this example the teacher will be assigned to CSCI369 friday class. Moving on lets check the 

### Edit teacher classes page:
![EditTeacherClasses](https://user-images.githubusercontent.com/107717142/229356934-c5e2a35e-6645-445a-b1bf-a663d2f97c2b.png)
In this page by simply inputing the teacher's ID and clicking the `search` button, you will be able to see all the classes that teacher is teaching. And beside each class there are two options: `Edit` and `Delete`. If you click edit teacher classes thats what you will see:

### Edit teacher classes page:
![EditTeacherClasses(Edit)](https://user-images.githubusercontent.com/107717142/229357060-c1c80495-073f-42c7-b840-52ad1980d946.png)
In this page you can edit the teacher's classes by entering the subject code and then changing the timing of the class, so lets say if the teacher got assigned to friday class by mistake, the admin can change the class from friday to monday for example.

### Delete teacher classes:
![EditTeacherClasses(Delete)](https://user-images.githubusercontent.com/107717142/229357144-9c947f89-80ec-4370-83b6-b09fd13900fc.png)
If the user clicks the `Delete` button the class will be removed.

And that was basically it for the teachers, now we will move to the students:
![home](https://user-images.githubusercontent.com/107717142/229357203-02c3cebc-f0d3-4e3e-a6b6-bcd48aed3a6e.png)
In the students' section we have 3 actions we can do. We will start with the 

### Add student to class Page:
![AddStudenttoclass](https://user-images.githubusercontent.com/107717142/229357244-2e5e09fb-9494-4321-a2fd-ae32b609fe47.png)
By simply filling the text fields, the student will be enrolled into that class, but if the student is already enrolled in that class, an error message will appearing saying that the student is already enrolled in that class:
![AddStudenttoclass](https://user-images.githubusercontent.com/107717142/229357244-2e5e09fb-9494-4321-a2fd-ae32b609fe47.png)

Moving on, we will check the Edit student classes by click it in the Admin home page:
![home](https://user-images.githubusercontent.com/107717142/229357527-23f0307d-b5f4-4861-bc96-105938ed3bbe.png)

### Edit student classes Page:
![EditStudentClasses](https://user-images.githubusercontent.com/107717142/229357567-ed5cee99-99f2-4ceb-9c38-936c35d31857.png)

In this page by simply inputing the student's ID and clicking the `search` button, you will be able to see all the classes that student is enrolled in. And beside each class there are two options: `Edit` and `Delete`. If you click edit student classes thats what you will see:

### Edit student classes page:
![EditStudentClasses(Edit)](https://user-images.githubusercontent.com/107717142/229357663-93b18cee-6fe8-4768-869e-d1349b6b2997.png)
In this page you can edit the student's classes by entering the subject code and then changing the timing of the class, so lets say if the student is enrolled to monday class and wants to change, then admin can change the class from monday to friday for example.

### Delete student classes:
![EditStudentClasses(Delete)](https://user-images.githubusercontent.com/107717142/229357646-8aaff3f3-fcfd-4b9c-ab94-ba65cfb581d3.png)
If the user clicks the `Delete` button the class will be removed.

Finally, the last action we can do to a student is edit student attendance:

### Edit student attendance page:
![EditStudentAttendance](https://user-images.githubusercontent.com/107717142/229357893-7182bee1-fbb4-467a-bdc7-b08a153dc961.png)
If the student did not show up to the class, he/she will be marked as absent, but if that student was sick or outside the country for example, then that student's attendance can be changed from absent to excused.

And that is bascially it, we went through all the web app together. We believe that this web app will make schools better.
