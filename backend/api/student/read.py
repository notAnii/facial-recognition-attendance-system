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
    sql = 'SELECT * FROM Student WHERE student_id =  %s ;' % student_id
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
        sql += ' AND day = "%s" AND start_time = "%s"' % (session_day, session_time)
        result = db.fetch(sql)
    else:
        result = db.fetch(sql)
    
    return result

#getting attendance for a specific class
def session_attendance(subject_code, session_number, status = None):
    db = DBHelper()
    sql = '''
        Select Student.student_id, Student.student_name, Attedance.week, Attendance.date, Attendance.status
        FROM Student, Enrolment, Attendance, Session, Subject
        WHERE Student.student_id = Enrolment.student_id AND Enrolment.enrolment_id = Attendance.enrolment_id AND 
        Session.session_id = Enrolment.session_id AND Subject.subject_code = Session.subject_code AND
        Subject.subject_code = '%s' AND Session.session_number = %s;
    ''' % (subject_code, session_number)

    if status != None:
        sql += 'AND status = "%s"' % status
        result = db.fetch(sql)
    else:
        result = db.fetch(sql)
        
    return result

