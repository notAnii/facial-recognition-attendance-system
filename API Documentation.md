# API DOCUMENTATION 
![alt text](https://cdn.discordapp.com/attachments/913815506568507444/1074721517079887992/8790-makima-chibi3.png "PAIN")
</br>
<hr>


## `POST /api/v1/login`

#### **Description:**
This is the endpoint for user authentication and creation of a JSON Web Token (JWT).

#### **Body:**
- `username`: In other words, the `teacher_id`.
- `password`: password.

#### **Responses:**
- **200 OK:** The access token was successfully generated.
  Example:
   ```json
   {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NjMwNjMwNCwianRpIjoiODI5NjA4ZWUtOGY3Ny00NThkLTgwYjgtZmIzYTFiNjU1OWQ5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEyMyIsIm5iZiI6MTY3NjMwNjMwNH0.L0MSIMvHT88hRN5DH2jNdY8GIsLpni_uKF4XXnTgB-c"
  }
  ```
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.
<hr>

### STILL WORKING ON THE ABOVE ENDPOINT SO DONT BOTHER FOR NOW, I WILL LET YOU KNOW.

<hr>



</br>
</br>
</br>





## `GET /api/v2/attendance/<subject_code>/<session_number>/<week>`

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
  Example:
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
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>
</br>
</br>





## `GET /api/v1/attendance/<subject_code>/<session_number>`

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
  Example:
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
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>
</br>
</br>





## `GET /api/v1/live-attendance/<subject_code>/<session_number>/<week>`

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
  Example:
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
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>
</br>
</br>





## `GET /api/v1/recent-attendance/<subject_code>/<session_number>/<week>`

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
  Example:
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
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>
</br>
</br>





## `GET /api/v1/teacher-info`

#### **Description:**
Returns the information for a specific teacher

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Responses:**
- **200 OK:** The teacher information data was successfully retrieved.
  Example:
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
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>
</br>
</br>





## `GET /api/v1/upcoming-classes`

#### **Description:**
Returns the upcoming classes for a specific teacher 

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Responses:**
- **200 OK:** The upcoming classes for teacher was successfully retrieved.
  Example:
   ```json
   i will fill this :D
  ```
  
- **204 No Content:** No upcoming classes data was found for this teacher.
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.





</br>
</br>
</br>





## `GET /api/v1/classes`

#### **Description:**
Returns the classes for a specific teacher 

#### **Authorization:**
This endpoint requires a JSON Web Token (JWT) for authentication.

#### **Responses:**
- **200 OK:** The classes for teacher was successfully retrieved.
  Example:
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
- **404 Not Found:** The requested data was not found.
- **500 Internal Server Error:** An unexpected error occurred while retrieving the attendance.

</br>
</br>
</br>
</br>

![alt text](https://cdn.discordapp.com/attachments/913815506568507444/1074730004899954762/Makima_peek94.PNG "PAIN")
</br>
>This thing will be much longer because we still have the admin page to do. So, for now, enjoy when it's still short :>
