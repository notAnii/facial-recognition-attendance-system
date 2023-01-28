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
    sql = '''
        SELECT Subject.subject_code, Subject.subject_name, Session.day,
        CAST(Session.start_time AS char) AS start_time , CAST(Session.end_time AS char) AS end_time,
        Session.room, Session.class_type
        FROM Subject, Session
        WHERE Subject.subject_code = Session.subject_code AND teacher_id = '%s' 
        ''' % teacher_id
    result = db.fetch(sql)
    return result