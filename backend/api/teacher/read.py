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