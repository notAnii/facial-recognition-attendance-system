from database.dbhelper import DBHelper
from util.util import getTime

#get all students
def all_students():
    db = DBHelper()
    sql = 'SELECT * FROM Student'
    result = db.fetch(sql)
    return result

#get single student
def single_student(student_id):
    db = DBHelper()
    sql = 'SELECT * FROM Student WHERE student_id =  %s' % student_id
    result = db.fetch(sql)
    return result

#getting all students for a specific subject or specific session
def students_subject(subject_code, session_day = None, session_time = None):
    db = DBHelper()
    sql = '''
        SELECT Student.student_id, Student.student_name, Teacher.teacher_name, Session.day, 
        CONCAT(Session.start_time, " - " , Session.end_time) AS "class_time"
        FROM Enrolment, Student, Subject, Session,Teacher
        WHERE Student.student_id = Enrolment.student_id AND 
        Subject.subject_code = Session.subject_code AND 
        Session.session_id = Enrolment.session_id AND
        Teacher.teacher_id = Session.teacher_id AND
        Subject.subject_code= '%s'
        ''' % subject_code

    if session_day != None and session_time != None:
        session_time = getTime(session_time)
        sql += ''' AND day = "%s" AND start_time = '%s' ''' % (session_day, session_time)
        result = db.fetch(sql)
    else:
        result = db.fetch(sql)
    
    return result

#getting attendance for a specific class
def session_attendance(subject_code, session_number, status = None, week = None):
    db = DBHelper()
    date_format = str("%d-%m-%y")
    sql = '''
        SELECT Student.student_id, Student.student_name, Attendance.week, 
            DATE_FORMAT(Attendance.date, '%s') as date, Attendance.status, ROUND(att_per.present_percentage,2) as attedance_percentage, att_per.unexcused_absences
        FROM Student
        INNER JOIN Enrolment ON Student.student_id = Enrolment.student_id
        INNER JOIN Attendance ON Enrolment.enrolment_id = Attendance.enrolment_id
        INNER JOIN Session ON Session.session_id = Enrolment.session_id
        INNER JOIN Subject ON Subject.subject_code = Session.subject_code
        INNER JOIN
        (
	        SELECT Student.student_id, (SUM(IF(Attendance.status = 'Present', 1, 0)) / COUNT(*)) * 100 AS present_percentage, 
                CONCAT(SUM(IF(Attendance.status = 'Absent', 1, 0)),'/','3') AS unexcused_absences
	        FROM Student
	        INNER JOIN Enrolment ON Student.student_id = Enrolment.student_id
	        INNER JOIN Attendance ON Enrolment.enrolment_id = Attendance.enrolment_id
	        INNER JOIN Session ON Session.session_id = Enrolment.session_id
	        INNER JOIN Subject ON Subject.subject_code = Session.subject_code
	        WHERE Subject.subject_code = '%s' 
	        GROUP BY Student.student_id
        ) AS att_per
        ON Student.student_id = att_per.student_id
        WHERE Subject.subject_code = '%s' AND Session.session_number = %s
        ''' % (date_format, subject_code, subject_code, session_number)

    if status != None:
        sql += ''' AND Attendance.status = '%s' ''' % status
    if week != None:
        sql += ''' AND Attendance.week = 'Week %s' ''' % week
        
    result = db.fetch(sql)
    return result

#getting live attendance for a specific class
def live_session_attendance(subject_code, session_number, week):
    db = DBHelper()
    time_format = str("%H:%i")
    sql = '''
        Select Student.student_id, Student.student_name, Student.program, CAST(time_format(Attendance.clock_in,'%s') AS Char) AS clock_in 
        FROM Student, Enrolment, Attendance, Session, Subject
        WHERE Student.student_id = Enrolment.student_id AND Enrolment.enrolment_id = Attendance.enrolment_id AND 
        Session.session_id = Enrolment.session_id AND Subject.subject_code = Session.subject_code AND
        Subject.subject_code = '%s' AND Session.session_number = %s AND Attendance.week = 'Week %s' AND Attendance.status = 'Present'
        ''' % (time_format, subject_code, session_number, week)
        
    result = db.fetch(sql)
    return result

#getting recent attendance for a specific class
def recent_session_attendance(subject_code, session_number, week):
    db = DBHelper()
    time_format = str("%H:%i")
    sql = '''
        SELECT Student.student_name, ROUND(att_per.present_percentage,2) as attedance_percentage, CAST(time_format(Attendance.clock_in,'%s') AS Char) AS clock_in
        FROM Student
        INNER JOIN Enrolment ON Student.student_id = Enrolment.student_id
        INNER JOIN Attendance ON Enrolment.enrolment_id = Attendance.enrolment_id
        INNER JOIN Session ON Session.session_id = Enrolment.session_id
        INNER JOIN Subject ON Subject.subject_code = Session.subject_code
        INNER JOIN
        (
	        SELECT Student.student_id, (SUM(IF(Attendance.status = 'Present', 1, 0)) / COUNT(*)) * 100 AS present_percentage
	        FROM Student
	        INNER JOIN Enrolment ON Student.student_id = Enrolment.student_id
	        INNER JOIN Attendance ON Enrolment.enrolment_id = Attendance.enrolment_id
	        INNER JOIN Session ON Session.session_id = Enrolment.session_id
	        INNER JOIN Subject ON Subject.subject_code = Session.subject_code
	        WHERE Subject.subject_code = '%s' 
	        GROUP BY Student.student_id
        ) AS att_per
        ON Student.student_id = att_per.student_id
        WHERE Attendance.status = 'Present' AND Subject.subject_code = '%s' AND Session.session_number = %s AND Attendance.week = 'Week %s'
        ''' % (time_format, subject_code, subject_code, session_number, week)
    
    result = db.fetch(sql)
    return result
