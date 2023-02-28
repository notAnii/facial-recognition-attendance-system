# Facial Recognition Attendance System

 ## Changelog
* [01/03/2023]
  * Added `class-counts` route to count number of classes per day for a teacher
  * Updated dummy password generator to create more test users

* [28/02/2023]
  * Added more sample data to database

* [25/02/2023]
  * Added `script.sh` bash file to activate venv and run the flask application
 
* [22/02/2023]
  * Fixed issue with CSRF in `/logout` route
  * Cleaned up `API Documentation.md`

* [21/02/2023]
  * Fixed cookie issues with browsers by enable security and disabling samesite
  * Added NextJS frontend to allowed domains


* [20/02/2023]
  * Added `password` attribute to `teacher` table
  * Added function to fetch only one record instead of dictionary
  * Changed execute function to be parameterized
  * Added function to retrieve `password` from `teacher` table and compare to a given string password
  * Added error handling to `/login` and `/logout` routes
  * Added credentials support for CORs in the flask app


* [19/02/2023]
  * Udpated `/login` and `/logout` in `API Documentation.md`
  * Added `bcrypt_utils.py`
    * Function to hash password
    * Function to compare and string to a hashed password


* [18/02/2023]
  * Added automatic server side refreshing for access toknes
  * Added /logout route that blacklists access tokens (currently in-memory)


* [17/02/2023]
  * Made `/login` route that sets access and refresh tokens has an httponly cookie
 
* [13/02/2023]
  * Removed `#non-necessities` from application for better readability
  * Removed `test.py` from repository to eliminate confusion 
  * Made a function to log and return errors
  * Added error loggers to endpoints
  * Made API documentation on `API Documentation.md`
 
* [12/02/2023]
  * Added v2 for `/attendance` where `week` is specified in the route instead of a parameter
  * Handled errors for all routes
  * Added new file to handle errors and response codes
  * Refactor `util` to `utility` and `util.py` to `utils.py`
 
* [11/02/2023]
  * Added test routes for `/attendance`, `/live-attendance`, `/recent-attendance`
 
* [10/02/2023] 
  * Teacher table
    * Added `department` attribute in `teacher` table
    * Added `position` attribute in `teacher` table
  * Added `/teacher-info` route
  * Added `/upcoming-classes` route
  * Add orderby statements to:
    * `/upcoming-classes` by ASC order of `start_time`
    * `/attendance` by ASC order of `student_name`
    * `/recent-attendance` by DESC order of `clock_in`
    * `/live-attendance` by ASC order of `student_name`
  * Added session number to the json reply in `/classes`
  * Fixed on issue with `/classes` where `start_time` was returning `end_time`
  * Added test routes for routes that required `get_jwt_identity()`
  
 
* [05/02/2023]
  * Attendance list for specific session:
    * Added attendance percentage for students
    * Added number of unexcused absensces for students
  * Live attendance list
    * Added attendance percentage
  * Added recent attendance route to API
  * Adjusted time formats from hh:mm:ss to hh:mm for:
    * `/classes`
    * `/live-attendance`
  * Cleaned up SQL backup 
 
* [31/01/2023]
  * Added program attribute e.g. BCs, BBIS, etc. in `student` table
  * Added route to return live attendance list
  * Updated database schema and insertions:
    * Added `program` attribute in `student` table
    * Added `clock_in` attribute in `attedance` table
 
* [29/01/2023]
  * Added API route to get attendance list for a specific class
  * Updated database schema and insertions:
    * Added `session_number` attribute in `session` table
    * Added `week` attribute added in `attendance` table for api simplicity
  
* [28/01/2023]
  * Added API route to get class(session) list for a specific teacher

* [08/01/2023]
  * Integrated JWT Authenticaion in flask app
  * Made login route using JWT
  
## Backlog

* Backend/API
  * Attendance list for specific session
    * ~~Calculate and add attendance percentage for a student~~
    * ~~Count and add number of unexcused absensces for a student~~
  
  * Starting attendance
    * ~~Add route to return live attendance list~~
    * ~~Add option to pick the week for attendance~~
    * ~~Calculate and add attendance percentage for a student~~
    
  * Student table
    * ~~Add program attribute e.g. BCs, BBIS, etc.~~
  
  * JWT Authentication
    * ~~Fix issues with token expiration and token refreshes~~
    * ~~Find where to stash access tokens in frontend~~
    
  * [ABANDONED]Notifications Feature
    * Decide if notifications needs a table 
    * Figure out how to have timed notifications system (do we need request to an API?)
  
  * Admin Portal
    * Add sessions to the database
    * Edit classes information
    * Modify student attendance
    
  * Hashing and store passwords
    * ~~find out what hashing algorithm to use~~
    * ~~decide what type of salting if any~~
  
  * ~~Add session number to the json reply in /classes~~
  
  * Teacher table
    * ~~Add Department~~
    * ~~Add passwords~~
  
  * Make a route for upcoming classes
    * ~~Make endpoint that queries to the current day~~
    * also uses /start-attendance route but we currently have no way of specifying the week on the dashboard
  
  * ~~Make route for the teacher information on the dashboard~~
  
  * Make the combination of session number and subject code unique
  
  * ~~Error handling~~ 
  
  * Dashboard graphs
  
* Backend/Facial-Recognition
  * Find reasonable size for dataset or decide who's system to running the tranining file in

