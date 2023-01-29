# Facial Recognition Attendance System

 ## Changelog
 
* [29/01/2023]
  * Added API route to get attendance list for a specific class
  * Made changes to database schema and insertions; added 'session_number' to sessions table and 'week' attr added to attendance table for api simplicity
  
* [28/01/2023]
  * Added API route to get class(session) list for a specific teacher

* [08/01/2023]
  * Integrated JWT Authenticaion in flask app
  * Made login route using JWT
  
## Backlog

* Backend/API
  * Attendance list for specific session
    * Calculate and add attendance percentage for a student
    * Count and add number of unexcused absensces for a student
  
  * Starting attendance
    * Add option to pick the week for attendance
    * Calculate and add attendance percentage for a student
    
  * Student table
    * Add program attribute e.g. BCs, BBIS, etc.
  
  * JWT Authentication
    * Fix issues with token expiration and token refreshes
    * Find where to stash access tokens in frontend
  
* Backend/Facial-Recognition
  * Find reasonable size for dataset or decide who's system to running the tranining file in

