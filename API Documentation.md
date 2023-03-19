# API DOCUMENTATION 
![alt text](https://cdn.discordapp.com/attachments/913815506568507444/1074721517079887992/8790-makima-chibi3.png "PAIN")
</br>
<hr>

# Login User

### URL: `POST /api/v1/login`
### URL: `POST /api/v1/admin-login`

#### **Description:**
Logins in user through the creation of a JSON Web Token (JWT).
</br>
Hashing Algorithm:
Bcrypt is a password hashing function that uses the Blowfish cipher to securely hash passwords. It was designed specifically for password hashing and is widely used in web applications to store user passwords securely.
</br>

The bcrypt algorithm works by first generating a random salt value, which is combined with the password and hashed using the Blowfish cipher. The resulting hash is then stored in the database, along with the salt value. When a user logs in, the stored hash and salt are retrieved from the database and the entered password is hashed with the same salt and cipher. If the resulting hash matches the stored hash, the login attempt is considered successful.

One of the key features of bcrypt is that it is designed to be slow and computationally intensive, which makes it difficult for attackers to perform brute-force attacks or use precomputed hash tables to crack passwords. Additionally, because a unique salt value is used for each password, even if two users have the same password, their hashes will be different.

In summary, bcrypt is a widely used password hashing function that uses the Blowfish cipher to securely hash passwords. It generates a random salt value for each password and is designed to be slow and computationally intensive to prevent brute-force attacks.

#### **Body:**
- `username`: In other words, the `teacher_id`.
- `password`: password.

  ```json
      {
        "username" : "123",
        "password" : "very bad yassin password"
      }
  ```
      

#### **Responses:**
- **200 OK:** Logs in user successfully.
  
  Headers:
  | Field        | Value           | Description  |
  | ------------- |-------------| -----|
  | Set-Cookie     | access_token_cookie=<JWT_ACCESS_TOKEN>; HttpOnly | Sets an HttpOnly cookie containing the access token. |
  | Set-Cookie      | refresh_token_cookie=<JWT_REFRESH_TOKEN>; HttpOnly | Sets an HttpOnly cookie containing the refresh token. |
  
  Body:
  
   ```json
   {
      "message": "Login Successful"
   }
  ```
- **400 Bad Request:** There was an error with the request.
  Body:
  ```json
   {
      "error": "Invalid username format"
   }
  ```

- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "error": "Username does not exist"
   }
  ```
  ```json
   {
      "error": "Incorrect password"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while logging in.



</br>



# Logout User

### URL: `POST /api/v1/logout`

#### **Description:**
Logs out user by revoking access token and adding it to a blacklist.

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

### **Request Headers**
- Content-Type: application/json
- Cookie: access_token_cookie=ACCESS_TOKEN; refresh_token_cookie=REFRESH_TOKEN

#### **Responses:**
- **200 OK:** Logs out user successfully
  Body:
  
   ```json
   {
      "message": "Logout successful" 
   }
  ```
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while logging out.
*  _**Note:**_ 
    * _This endpoint requires the user to be authenticated via a valid access token cookie. If the access token cookie is not present or is invalid, the user will     receive a 401 Unauthorized response._
    * _If the user is already logged out or their token has expired, the endpoint will still return a 200 OK response._

</br>




# Student Attendance Version 2.0

### URL: `GET /api/v2/attendance/<subject_code>/<session_number>/<week>`

#### **Description:**
Returns the attendance list for a specific session with additional query parameters.

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Path parameters:**
- `subject_code (string)` - The subject code for which attendance needs to be retrieved.
- `session_number (integer)` - The session number for which attendance needs to be retrieved.
- `week (integer)` - The week for which attendance needs to be retrieved [1-10].

#### **Query parameters:**
- `status (string)` - The status of the attendees (e.g. "Present", "Absent", "Excused").

#### **Responses:**
- **200 OK:** The attendance list was successfully retrieved.
  Body:
  
   ```json
   [
    {
        "attedance_percentage": "66.67",
        "date": "02-01-23",
        "status": "Present",
        "student_id": 6633249,
        "student_name": "Abshir",
        "unexcused_absences": "0/3",
        "week": "Week 1"
    },
  ```
  
- **204 No Content:** No attendance data was found.
- **400 Bad Request:** There was an error with the request.
  Body:
  
  ```json
  {
    "error": "Invalid week"
  }
  ```
  ```json
  {
    "error": "Invalid week format"
  }
  ```
  ```json
  {
    "error": "Invalid session number format"
  }
  ```
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
   
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>




# Student Attendance Version 1.0

### URL: `GET /api/v1/attendance/<subject_code>/<session_number>`

#### **Description:**
Returns the attendance list for a specific session with additional query parameters.

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Path parameters:**
- `subject_code (string)` - The subject code for which attendance needs to be retrieved.
- `session_number (integer)` - The session number for which attendance needs to be retrieved.

#### **Query parameters:**
- `status (string)` - The status of the attendees (e.g. "Present", "Absent", "Excused").
- `week (integer)` - The week for which attendance needs to be retrieved [1-10].

#### **Responses:**
- **200 OK:** The attendance list was successfully retrieved.
  Body:
  
   ```json
   [
    {
        "attedance_percentage": "66.67",
        "date": "02-01-23",
        "status": "Present",
        "student_id": 6633249,
        "student_name": "Abshir",
        "unexcused_absences": "0/3",
        "week": "Week 1"
    },
  ```
  
- **204 No Content:** No attendance data was found.
- **400 Bad Request:** There was an error with the request.
  Body:
  
  ```json
  {
    "error": "Invalid week"
  }
  ```
  ```json
  {
    "error": "Invalid week format"
  }
  ```
  ```json
  {
    "error": "Invalid session number format"
  }
  ```
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>




# Live Student Attendance

### URL: `GET /api/v1/live-attendance/<subject_code>/<session_number>/<week>`

#### **Description:**
Returns the live attendance list (present) for a specific session 

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Path parameters:**
- `subject_code (string)` - The subject code for which attendance needs to be retrieved.
- `session_number (integer)` - The session number for which attendance needs to be retrieved.
- `week (integer)` - The week for which attendance needs to be retrieved [1-10].

#### **Responses:**
- **200 OK:** The live attendance list was successfully retrieved.
  Body:
  
   ```json
   [
    {
        "clock_in": "13:30",
        "program": "BCS",
        "student_id": 6633249,
        "student_name": "Abshir"
    },
    {
        "clock_in": "13:31",
        "program": "BCS",
        "student_id": 6616781,
        "student_name": "Aeron"
    },
  ```
  
- **204 No Content:** No live attendance data was found.
- **400 Bad Request:** There was an error with the request.
  Body:
  
  ```json
  {
    "error": "Invalid week"
  }
  ```
  ```json
  {
    "error": "Invalid week format"
  }
  ```
  ```json
  {
    "error": "Invalid session number format"
  }
  ```
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>




# Recent Student Attendance

### URL: `GET /api/v1/recent-attendance/<subject_code>/<session_number>/<week>`

#### **Description:**
Returns the recent attendance list (present) for a specific session 

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Path parameters:**
- `subject_code (string)` - The subject code for which attendance needs to be retrieved.
- `session_number (integer)` - The session number for which attendance needs to be retrieved.
- `week (integer)` - The week for which attendance needs to be retrieved [1-10].

#### **Responses:**
- **200 OK:** The recent attendance list was successfully retrieved.
  Body:
  
   ```json
   [
    {
        "attedance_percentage": "100.00",
        "clock_in": "13:31",
        "student_name": "Aeron"
    },
    {
        "attedance_percentage": "66.67",
        "clock_in": "13:30",
        "student_name": "Abshir"
    },
  ```
  
- **204 No Content:** No recent attendance data was found.
- **400 Bad Request:** There was an error with the request.
  Example:
  
  ```json
  {
    "error": "Invalid week"
  }
  ```
  ```json
  {
    "error": "Invalid week format"
  }
  ```
  ```json
  {
    "error": "Invalid session number format"
  }
  ```
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>




# Teacher Information

### URL: `GET /api/v1/teacher-info`

#### **Description:**
Returns the information for a specific teacher

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Responses:**
- **200 OK:** The teacher information data was successfully retrieved.
  Body:
  
   ```json
   [
    {
        "department": "FEIS",
        "position": "Tutor",
        "teacher_name": "Not Sloy"
    }
  ]
  ```
  
- **204 No Content:** No teacher information data was found.
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the teacher information.





</br>



# Upcoming Classes

### URL: `GET /api/v1/upcoming-classes`

#### **Description:**
Returns the upcoming classes for a specific teacher 

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Responses:**
- **200 OK:** The upcoming classes for teacher was successfully retrieved.
  Body:
  
   ```json
   [
    {
      "room": "3.43",
      "session_number": 1,
      "subject_code": "MATH221",
      "subject_name": "Mathematics",
      "timing": "09:30 - 10:30"
    },
    {
      "room": "5.11",
      "session_number": 1,
      "subject_code": "CSIT111",
      "subject_name": "Programming",
      "timing": "13:30 - 15:30"
    },
  ```
  
- **204 No Content:** No upcoming classes data was found for this teacher.
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the upcoming classes.





</br>




# Teacher's Classes

### URL: `GET /api/v1/classes`

#### **Description:**
Returns the classes for a specific teacher 

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Responses:**
- **200 OK:** The classes for teacher was successfully retrieved.
  Body:
  
   ```json
   [
    {
        "class_type": "Tutorial",
        "day": "Tuesday",
        "end_time": "15:30",
        "room": "5.11",
        "session_number": 1,
        "start_time": "13:30",
        "subject_code": "CSIT111",
        "subject_name": "Programming"
    },
    {
        "class_type": "Lab",
        "day": "Tuesday",
        "end_time": "10:30",
        "room": "3.43",
        "session_number": 1,
        "start_time": "09:30",
        "subject_code": "MATH221",
        "subject_name": "Mathematics"
    },
  ```
  
- **204 No Content:** No classes data was found for this teacher.
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the classes.

</br>




# Teacher's class counts

### URL: `GET /api/v1/class-counts`

#### **Description:**
Returns the class counts per day for a specific teacher 

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Responses:**
- **200 OK:** The class counts for teacher was successfully retrieved.
  Body:
  
   ```json
   [
    {
        "day": "Monday",
        "num_sessions": 1
    },
    {
        "day": "Tuesday",
        "num_sessions": 1
    },
    {
        "day": "Wednesday",
        "num_sessions": 1
    },
  ```
  
- **204 No Content:** No classes data was found for this teacher.
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the class counts for teacher.

</br>

# ADMIN ENDPOINTS

# Teacher's Classes

### URL: `GET /api/v1/teacher-classes/<teacher_id>`

#### **Description:**
Returns the classes for a specific teacher 

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Path parameters:**
- `teacher_id (id)` - The teacher id for the classes that needs to be retrieved.

#### **Responses:**
- **200 OK:** The classes for teacher was successfully retrieved.
  Body:
  
   ```json
   [
    {
        "class_type": "Tutorial",
        "day": "Tuesday",
        "end_time": "15:30",
        "room": "5.11",
        "session_number": 1,
        "start_time": "13:30",
        "subject_code": "CSIT111",
        "subject_name": "Programming"
    },
    {
        "class_type": "Lab",
        "day": "Tuesday",
        "end_time": "10:30",
        "room": "3.43",
        "session_number": 1,
        "start_time": "09:30",
        "subject_code": "MATH221",
        "subject_name": "Mathematics"
    },
  ```
  
- **204 No Content:** No classes data was found for this teacher.
- **401 Unauthorized:** Bad username or password/ Invalid token.

  Body:
  ```json
   {
      "msg": "Token expired"
   }
  ```
  ```json
   {
      "msg": "Token revoked"
   }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the classes.

</br>

# Assign Teacher

### URL: `PUT /api/v1/assign-teacher`

#### **Description:**
Assigns teacher to a specific session

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Body:**
  ```json
      {
        "teacher_id" : "123",
        "subject_code" : "CSCI369",
        "session_number" : "1"
      }
  ```

#### **Responses:**
- **200 OK:** Success.

</br>

# Unassign Teacher

### URL: `PUT /api/v1/assign-teacher`

#### **Description:**
Removes teacher from a specific session

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Body:**
  ```json
      {
        "teacher_id" : "123",
        "subject_code" : "CSCI369",
        "session_number" : "1"
      }
  ```

#### **Responses:**
- **200 OK:** Success.

</br>

# Enrol Student

### URL: `POST /api/v1/enrol-student`

#### **Description:**
Enrols student to a specific session

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Body:**
  ```json
      {
        "student_id" : "6633249",
        "subject_code" : "CSCI369",
        "session_number" : "1"
      }
  ```

#### **Responses:**
- **200 OK:** Success.

</br>

# Student Classes

### URL: `GET /api/v1/student-classes/<student_id>`

#### **Description:**
Enrols student to a specific session

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.\

#### **Path parameters:**
- `student_id (int)` - The student id for classes that need to retrieved.

#### **Responses:**
- **200 OK:** Success.
 Body:
  
   ```json
   [
    {
        "day": "Monday",
        "end_time": "15:30",
        "enrolment_id": 1,
        "session_number": 1,
        "start_time": "13:30",
        "subject_code": "CSCI369",
        "subject_name": "Ethical Hacking"
    },
    {
        "day": "Wednesday",
        "end_time": "10:30",
        "enrolment_id": 43,
        "session_number": 1,
        "start_time": "08:30",
        "subject_code": "MATH221",
        "subject_name": "Mathematics"
    },
  ```
</br>

# Edit Student Sessions

### URL: `POST /api/v1/edit-student`

#### **Description:**
Edit session for a specific student

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Body:**
  ```json
      {
        "enrolment_id" : "85",
        "subject_code" : "CSCI369",
        "session_number" : "1"
      }
  ```

#### **Responses:**
- **200 OK:** Success.

</br>

# Unenrol Student
### URL: `DELETE /api/v1/unenrol-student/<enrolment_id>`

#### **Description:**
Unenrols student from a specifi session

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Path parameters:**
- `enrolment_id (int)` - The enrolment id for the one that needs to removed.

#### **Responses:**
- **200 OK:** Success.

</br>

# Update Student Attendance

### URL: `PUT /api/v1/update-attendance`

#### **Description:**
Updates student attendance for a specific session

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Body:**
  ```json
      {
        "student_id" : "6633249",
        "subject_code" : "CSCI369",
        "session_number" : "1",
        "week" : "1",
        "status" : "Excused"
      }
  ```

#### **Responses:**
- **200 OK:** Success.

</br>
</br>
</br>
</br>


![alt text](https://cdn.discordapp.com/attachments/913815506568507444/1074730004899954762/Makima_peek94.PNG "PAIN")

