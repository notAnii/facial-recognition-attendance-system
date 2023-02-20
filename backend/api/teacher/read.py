from database.dbhelper import DBHelper

#get all teachers
def all_teachers():
    db = DBHelper()
    sql = 'SELECT * FROM Teacher'
    result = db.fetch(sql)
    return result

#get single teacher
def single_teacher(teacher_id):
    db = DBHelper()
    sql = 'SELECT * FROM Teacher WHERE teacher_id =  %s ;' % teacher_id
    result = db.fetch(sql)
    return result

#get all classes for a teacher
def all_classes(teacher_id):
    db = DBHelper()
    time_format = str("%H:%i")
    sql = '''
        SELECT Subject.subject_code, Subject.subject_name, Session.day,
        CAST(time_format(Session.start_time,'%s') AS Char) AS start_time , CAST(time_format(Session.end_time,'%s') AS Char) AS end_time,
        Session.room, Session.class_type, Session.session_number
        FROM Subject, Session
        WHERE Subject.subject_code = Session.subject_code AND teacher_id = %s 
        ''' % (time_format, time_format, teacher_id)
    result = db.fetch(sql)
    return result

#get teacher information for dashboard
def teacher_info(teacher_id):
    db = DBHelper()
    sql = '''
        SELECT teacher_name, department, position
        FROM Teacher
        WHERE teacher_id = %s
        ''' % teacher_id
    result = db.fetch(sql)
    return result

#get upcoming classes for a teacher in dashboard
def upcoming_classes(teacher_id):
    db = DBHelper()
    time_format = str("%H:%i")
    sql = '''
        SELECT Subject.subject_code, Subject.subject_name, Session.room, CONCAT(CAST(time_format(Session.start_time,'%s') AS Char) , ' - ',CAST(time_format(Session.end_time,'%s') AS Char)) AS timing, Session.session_number
        FROM Subject
        INNER JOIN Session ON Subject.subject_code = Session.subject_code
        INNER JOIN Teacher ON Teacher.teacher_id = Session.teacher_id
        WHERE Session.day = DAYNAME(CURDATE()) AND Teacher.teacher_id = %s
        ORDER BY Session.start_time ASC
        ''' % (time_format, time_format, teacher_id)
    result = db.fetch(sql)
    return result

#get teacher password
def teacher_password(teacher_id):
    db = DBHelper()
    sql = '''
        SELECT password
        FROM Teacher
        WHERE teacher_id = %s
        ''' % teacher_id
    result = db.fetchone(sql)
    return result['password']  