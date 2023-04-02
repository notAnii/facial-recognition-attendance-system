from database.dbhelper import DBHelper
from utility.utils import get_current_time, get_today_date, getTime
from utility.email_utils import send_email

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

    sql += ''' ORDER BY Student.student_name ASC '''    
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
        ORDER BY Student.student_name
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
        ORDER BY Attendance.clock_in DESC
        ''' % (time_format, subject_code, subject_code, session_number, week)
    
    result = db.fetch(sql)
    return result

#populates attendance with pending status
def populate_attendance(subject_code, session_number, week):
    db = DBHelper()
    fetch_sql = '''
        SELECT Enrolment.student_id, Enrolment.enrolment_id
        FROM Enrolment
        INNER JOIN Session ON Enrolment.session_id = Session.session_id
        WHERE Session.subject_code = '%s' AND Session.session_number = %s        
        ''' % (subject_code, session_number)
    students = db.fetch(fetch_sql)
    student_ids = [r['student_id'] for r in students]
    enrolment_ids =[r['enrolment_id'] for r in students]

    check_sql = '''
        SELECT COUNT(Attendance.attendance_id) as count
        FROM Attendance
        INNER JOIN Enrolment ON Enrolment.enrolment_id = Attendance.enrolment_id
        INNER JOIN Session ON Enrolment.session_id = Session.session_id
        WHERE Session.subject_code = '%s' AND Session.session_number = %s AND Attendance.week = 'Week %s'
    ''' % (subject_code, session_number, week)

    if (db.fetchone(check_sql)['count'] == 0):
        for enrolment in enrolment_ids:
            insert_sql = '''
                INSERT INTO Attendance (enrolment_id, week, date, clock_in, status) 
                VALUES (%s, 'Week %s', %s, NULL, 'Pending')
            '''
            db.execute(insert_sql, (enrolment, week, str(get_today_date())))

#sets attendance status to present    
def set_present_status(student_id, subject_code, session_number, week):
    if student_in_class(student_id, subject_code, session_number):
        db = DBHelper()
        fetch_sql = '''
        SELECT Attendance.attendance_id
        FROM Attendance
        INNER JOIN Enrolment ON Enrolment.enrolment_id = Attendance.enrolment_id
        INNER JOIN Session ON Enrolment.session_id = Session.session_id
        WHERE Enrolment.student_id = %s AND Session.subject_code = '%s' AND Session.session_number = %s AND Attendance.week = 'Week %s'
        ''' % (student_id, subject_code, session_number, week)
        attendance_id = db.fetchone(fetch_sql)['attendance_id']

        check_sql = '''
            SELECT Attendance.status
            FROM Attendance
            INNER JOIN Enrolment ON Enrolment.enrolment_id = Attendance.enrolment_id
            INNER JOIN Session ON Enrolment.session_id = Session.session_id
            WHERE Enrolment.student_id = %s AND Session.subject_code = '%s' AND Session.session_number = %s AND Attendance.week = 'Week %s'
        ''' % (student_id, subject_code, session_number, week)

        if(db.fetchone(check_sql)['status'] != 'Present' ):
            update_sql = '''
            UPDATE Attendance
            SET status = 'Present', clock_in = %s
            WHERE attendance_id = %s
            '''
            db.execute(update_sql, (str(get_current_time()),attendance_id))

#check if student is in class
def student_in_class(student_id, subject_code, session_number):
    db = DBHelper()
    sql  = '''
        SELECT COUNT(Enrolment.student_id) as count
        FROM Enrolment
        INNER JOIN Session ON Enrolment.session_id = Session.session_id
        WHERE Session.subject_code = '%s' AND Session.session_number = %s AND Enrolment.student_id = %s   
    ''' % (subject_code, session_number, student_id)
    if (db.fetchone(sql)['count'] > 0):
        return True
    return False

def completed_attendance(subject_code, session_number, week):
    db = DBHelper()
    fetch_sql = '''
        SELECT Attendance.attendance_id
        FROM Attendance
        INNER JOIN Enrolment ON Enrolment.enrolment_id = Attendance.enrolment_id
        INNER JOIN Session ON Session.session_id = Enrolment.session_id
        WHERE Session.subject_code = '%s' AND Session.session_number = %s and Attendance.week = 'Week %s'
        ''' % (subject_code, session_number, week)
    students = db.fetch(fetch_sql)
    attendance_ids =[r['attendance_id'] for r in students]

    for attendance in attendance_ids:
        sql = '''
            UPDATE Attendance 
            SET Attendance.status = 'Absent'
            WHERE Attendance.status = 'Pending' and Attendance.attendance_id = %s
        ''' 
        db.execute(sql, attendance)

    failed_sql = '''
        SELECT Student.student_id, Student.student_name, Enrolment.enrolment_id, Student.student_email
        FROM Attendance
        INNER JOIN Enrolment 
        ON Enrolment.enrolment_id = Attendance.enrolment_id
        INNER JOIN Session 
        ON Session.session_id = Enrolment.session_id
        INNER JOIN Student
        ON Student.student_id = Enrolment.student_id
        WHERE Attendance.status = 'Absent' AND Session.session_number = %s AND Session.subject_code = '%s'
        GROUP BY Attendance.enrolment_id
        HAVING count(Attendance.enrolment_id) > 3;
    ''' % (session_number, subject_code)

    failed_result = db.fetch(failed_sql)

    for students in failed_result:
        sender_email = "no-reply.kaisen@outlook.com"
        receiver_email = students['student_email']
        password = "TeamKaisen@123"
        subject = "Technical Fail"
        message = f"Dear {students['student_name']} ({students['student_id']}),\n\nThis is to inform you that you have technically failed {subject_code}.\nFor further details, please contact us.\n\nRegards,\nKaisen"

        check_fail = '''
            SELECT count(enrolment_id) as count
            FROM Technical_Fail
            WHERE enrolment_id = %s
        ''' % (students['enrolment_id'])
        if db.fetchone(check_fail)['count'] == 0:
            send_email(sender_email, receiver_email, password, subject, message)
            insert_fail = '''
                	INSERT INTO Technical_fail VALUES (%s)
            '''
            db.execute(insert_fail, students['enrolment_id'])

        

#enrol student to class
def enrol_student(student_id, subject_code, session_number):
    db = DBHelper()
    fetch_sql = '''
        SELECT session_id
        FROM Session
        WHERE subject_code = '%s' AND session_number = %s;
    ''' % (subject_code, session_number)
    session_id = db.fetchone(fetch_sql)['session_id']

    check_sql = '''
        SELECT count(Enrolment.enrolment_id) as count
        FROM Enrolment
        INNER JOIN Session
        ON Enrolment.session_id = Session.session_id
        WHERE Enrolment.student_id = %s AND Session.session_id = %s;
    ''' % (student_id, session_id)
    
    if(db.fetchone(check_sql)['count'] == 0):
        enrol_sql = '''
            INSERT INTO Enrolment (student_id, session_id) VALUES (%s, %s);
        '''
        db.execute(enrol_sql, (student_id, session_id))
        return True
    else:
        return False

#get student classes
def student_classes(student_id):
    db = DBHelper()
    time_format = str("%H:%i")
    sql = '''
        SELECT Enrolment.enrolment_id, Session.subject_code, Subject.subject_name, Session.day, Session.session_number, 
        CAST(time_format(Session.start_time,'%s') AS Char) AS start_time, 
        CAST(time_format(Session.end_time,'%s') AS Char) AS end_time
        FROM Enrolment
        INNER JOIN Session
        ON Enrolment.session_id = Session.session_id
        INNER JOIN Subject
        ON Session.subject_code = Subject.subject_code
        WHERE Enrolment.student_id = %s;
    ''' % (time_format, time_format, student_id)
    result = db.fetch(sql)
    return result

#edit student class
def edit_student_class(enrolment_id, subject_code, session_number):
    db = DBHelper()
    fetch_sql = '''
        SELECT session_id
        FROM Session
        WHERE subject_code = '%s' AND session_number = %s;
    ''' % (subject_code, session_number)
    session_id = db.fetchone(fetch_sql)['session_id']

    edit_sql = '''
        UPDATE Enrolment
        SET session_id = %s
        WHERE enrolment_id = %s
    '''
    db.execute(edit_sql, (session_id, enrolment_id))

#delete student enrolment
def unenrol_student(enrolment_id):
    db = DBHelper()
    sql = '''
        DELETE FROM Enrolment
        WHERE enrolment_id = %s;
    '''
    db.execute(sql, (enrolment_id))

#update student attendance
def update_attendance(student_id, subject_code, session_number, week, status):
    db = DBHelper()
    fetch_sql = '''
    SELECT Attendance.attendance_id, Attendance.status
    FROM Attendance
    INNER JOIN Enrolment ON Enrolment.enrolment_id = Attendance.enrolment_id
    INNER JOIN Session ON Enrolment.session_id = Session.session_id
    WHERE Enrolment.student_id = %s AND Session.subject_code = '%s' AND Session.session_number = %s AND Attendance.week = 'Week %s'
    ''' % (student_id, subject_code, session_number, week)
    result = db.fetchone(fetch_sql)
    attendance_id = result['attendance_id']
    previous_status = result['status']
    
    if not (previous_status == 'Present' and status == 'Present'):
        update_sql = '''
            UPDATE Attendance
            SET status = %s, clock_in = NULL
            WHERE attendance_id = %s
        '''
        db.execute(update_sql, (status, attendance_id))

def subject_sessions(subject_code):
    db = DBHelper()
    time_format = str("%H:%i")
    sql = '''
        SELECT session_number, day, 
        CAST(time_format(Session.start_time,'%s') AS Char) AS start_time, 
        CAST(time_format(Session.end_time,'%s') AS Char) AS end_time
        FROM Session
        WHERE Session.subject_code = '%s'
    ''' % (time_format, time_format, subject_code)

    result = db.fetch(sql)
    return result

def check_class_status(subject_code, session_number, week):
    db = DBHelper()
    check_sql = '''
        SELECT COUNT(Attendance.attendance_id) as count
        FROM Attendance
        INNER JOIN Enrolment 
        ON Enrolment.enrolment_id = Attendance.enrolment_id
        INNER JOIN Session
        ON Session.session_id = Enrolment.session_id
        WHERE Session.subject_code = '%s' AND Session.session_number = %s AND Attendance.week = 'Week %s' AND  Attendance.status != 'Pending'
    ''' % ( subject_code, session_number, week)

    result = db.fetchone(check_sql)

    if result['count'] > 0:
        return False
    
    return True;