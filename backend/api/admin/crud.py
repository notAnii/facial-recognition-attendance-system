from database.dbhelper import DBHelper

def admin_dummy_password(admin_id, password):
    db = DBHelper()
    sql = '''
        UPDATE Admin
        SET password = %s
        WHERE admin_id = %s
        ''' 
    db.execute(sql, (password, admin_id))

#get admin password
def admin_password(admin_id):
    db = DBHelper()
    sql = '''
        SELECT password
        FROM Admin
        WHERE admin_id = %s
        ''' % admin_id
    result = db.fetchone(sql)
    return result 