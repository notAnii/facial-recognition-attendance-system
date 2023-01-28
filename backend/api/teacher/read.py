from database.dbhelper import DBHelper

def all_teachers():
    db = DBHelper()
    sql = 'SELECT * FROM Teacher'
    result = db.fetch(sql)
    return result

def single_teacher(teacher_id):
    db = DBHelper()
    sql = 'SELECT * FROM Teacher WHERE teacher_id =  %s ;' % teacher_id
    result = db.fetch(sql)
    return result

def all_classes(teacher_id):
    db = DBHelper()
    sql = '''
        SELECT Subject.subject_code, Subject.subject_name, Session.day, Session.start_time, Session.end_time, Session.room, Session.class_type
        FROM Subject, Session
        WHERE Subject.subject_code = Session.subject_code AND teacher_id = '%s' 
        ''' % teacher_id
    result = db.fetch(sql)
    return result