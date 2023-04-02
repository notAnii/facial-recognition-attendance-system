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
In this page all the classes that the teacher is teaching will be displayed in the screen with more details like subject name, time, and ... Beside each class there are two options: `View attendance` and `Start attendance`. 

When you click `View attendance` this page will be displayed:
### View attendance page
![viewAttendance](https://user-images.githubusercontent.com/107717142/229355581-b7f88953-3d1a-4822-a975-ae43144ebd6f.png)
In this page all the students' attendance that was recorded in the class in week 1 will be listed in the screen, if you want to check the students' attendance in a different week, you can click the arrows at the button of the screen:
![moveWeeks](https://user-images.githubusercontent.com/107717142/229355750-b6594e93-99bd-49ca-8920-29a5ce7890be.png)
Other than that, the teacher will be able to filter the list by present, absent, or excused students:
![viewAttendance2](https://user-images.githubusercontent.com/107717142/229355784-e807fc32-df02-49d4-859f-cf620e133c14.png)
Moreover, if the teacher wants to know the attendance of a specific student, then the teacher will be able to use the search bar on top to 
### Search by student name:
![searchByStudentName](https://user-images.githubusercontent.com/107717142/229355854-eff84fd3-7eba-4fb7-8d47-673ef75916f7.png)

### Search by student ID:
![searchByStudentID](https://user-images.githubusercontent.com/107717142/229355896-e987a047-fd80-497e-89b3-36b98043dd10.png)

### Search by day:
![searchByDay](https://user-images.githubusercontent.com/107717142/229355915-554a378a-23aa-4ad7-a08e-edbb1e1aa4b8.png)
