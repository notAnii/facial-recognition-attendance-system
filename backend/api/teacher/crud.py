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

#get class counts for a teacher in dashboard
def class_counts(teacher_id):
    db = DBHelper()
    sql = '''
        SELECT days.day, COALESCE(counts.num_sessions, 0) AS num_sessions
        FROM (
            SELECT 'Monday' AS day
            UNION SELECT 'Tuesday'
            UNION SELECT 'Wednesday'
            UNION SELECT 'Thursday'
            UNION SELECT 'Friday'
        ) AS days
        LEFT JOIN (
            SELECT Session.day, COUNT(Session.session_id) AS num_sessions
            FROM Session
            INNER JOIN Teacher ON Session.teacher_id = Teacher.teacher_id
            WHERE Teacher.teacher_id = %s
            GROUP BY Session.day
        ) AS counts ON days.day = counts.day
        ORDER BY CASE days.day
         WHEN 'Monday' THEN 1
         WHEN 'Tuesday' THEN 2
         WHEN 'Wednesday' THEN 3
         WHEN 'Thursday' THEN 4
         WHEN 'Friday' THEN 5
         END;
        ''' % teacher_id
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
    return result 

def dummy_password(teacher_id, password):
    db = DBHelper()
    sql = '''
        UPDATE Teacher
        SET password = %s
        WHERE teacher_id = %s
        ''' 
    db.execute(sql, (password, teacher_id))

#teacher class assignment
def assign_teacher(teacher_id, subject_code, session_number):
    db = DBHelper()
    check_sql = '''
        SELECT count(teacher_id) as count
        FROM Session
        WHERE teacher_id = %s AND subject_code = '%s' AND session_number = %s 
    ''' % (teacher_id, subject_code, session_number)

    if (db.fetchone(check_sql)['count'] == 0):
        sql = '''
            UPDATE Session
            SET teacher_id = %s
            WHERE subject_code = %s AND session_number = %s
        '''
        db.execute(sql, (teacher_id, subject_code, session_number))  
        return True
    else:
        return False  

#unassign teacher from class
def unassign_teacher(teacher_id, subject_code, session_number):
    db = DBHelper()
    sql = '''
        UPDATE Session
        SET teacher_id = Null
        WHERE teacher_id = %s AND subject_code = %s AND session_number = %s
    '''
    db.execute(sql, (teacher_id, subject_code, session_number))

#edit teacher session
def edit_teacher(teacher_id, new_subject_code, new_session_number, old_subject_code, old_session_number):
    db = DBHelper()
    check_sql = '''
        SELECT count(teacher_id) as count
        FROM Session
        WHERE teacher_id = %s AND subject_code = '%s' AND session_number = %s 
    ''' % (teacher_id, new_subject_code, new_session_number)

    old_class_exists = '''
        SELECT count(session_id) as count
        FROM Session
        WHERE subject_code = '%s' AND session_number = %s 
    ''' % (old_subject_code, old_session_number)

    new_class_exists = '''
        SELECT count(session_id) as count
        FROM Session
        WHERE subject_code = '%s' AND session_number = %s 
    ''' % (new_subject_code, new_session_number)
    if(old_subject_code == new_subject_code and old_session_number == new_session_number):
        return False
    else:
        if (db.fetchone(old_class_exists)['count'] == 1 and db.fetchone(new_class_exists)['count'] == 1):
            if (db.fetchone(check_sql)['count'] == 0):
                sql = '''
                    UPDATE Session
                    SET teacher_id = %s
                    WHERE subject_code = %s AND session_number = %s
                '''
                db.execute(sql, (teacher_id, new_subject_code, new_session_number)) 
                if (db.fetchone(check_sql)['count'] == 1):
                    unassign_teacher(teacher_id, old_subject_code, old_session_number)
                    return True
                else:
                    return False
            else:
                return False
            