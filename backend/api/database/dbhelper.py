import pymysql
from database.config import HOST, USERNAME, PASSWORD, DATABASE

class DBHelper:

    #init object with database configurations
    def __init__(self):
        self.host = HOST
        self.user = USERNAME
        self.password = PASSWORD
        self.db = DATABASE

    #opening connection database
    def __connect__(self):
        self.con = pymysql.connect(host=self.host, user=self.user, password=self.password, db=self.db, cursorclass=pymysql.cursors.
                                   DictCursor)
        self.cur = self.con.cursor()

    #closing connection database
    def __disconnect__(self):
        self.con.close()

    #fetching query result
    def fetch(self, sql):
        self.__connect__()
        self.cur.execute(sql)
        result = self.cur.fetchall()
        self.__disconnect__()
        return result

   #fetching one query result
    def fetchone(self, sql):
        self.__connect__()
        self.cur.execute(sql)
        result = self.cur.fetchone()
        self.__disconnect__()
        return result

    #executing sql query
    def execute(self, sql, params=None):
        self.__connect__()
        self.cur.execute(sql, params)
        self.con.commit()
        self.__disconnect__()