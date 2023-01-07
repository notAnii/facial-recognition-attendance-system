from flask import Flask, jsonify, request
from test import sayhi
from student.read import *
from teacher.read import all_teachers, single_teacher

app = Flask(__name__)

#login
@app.route('/api/login', methods = ['POST'])
def login():
    try:
    # placeholder
        teacher_id = request.json['teacher_id']
        email = request.json['email']
        password = request.json['password']
        return teacher_id, 200
    except Exception as e:
        return e, 404

#starting the attendance 
@app.route('/api/startRecognition', methods = ['GET'])
def start_recognition():
    sayhi()
    return "Success", 200

#get all students
@app.route('/api/students', methods = ['GET'])
def get_all_students():
    result = all_students()
    return jsonify(result), 200

#get single student
@app.route('/api/students/<student_id>', methods = ['GET'])
def get_single_student(student_id):
    result = single_student(student_id)
    return jsonify(result), 200

#get all teachers
@app.route('/api/teachers', methods = ['GET'])
def get_all_teachers():
    result = all_teachers()
    return jsonify(result), 200

#get single teacher
@app.route('/api/teachers/<teacher_id>', methods = ['GET'])
def get_single_teacher(teacher_id):
    result = single_teacher(teacher_id)
    return jsonify(result), 200

#getting all students for a specific subject or specific session
@app.route('/api/subjects/<subject_code>/students', methods = ['GET'])
def get_students_subject(subject_code):
    day = request.args.get('day')
    time = request.args.get('time')
    result = students_subject(subject_code, day, time)
    return jsonify(result), 200

#getting attendance for a specific class
@app.route('/api/subjects/<subject_code>', methods = ['GET'])
def get_session_attendance(subject_code):
    result = session_attendance(subject_code)
    return jsonify(result), 200


if __name__ == '__main__':
    app.run(debug=True)
