from flask import Flask, jsonify, request
from test import sayhi
from student.read import *
from teacher.read import all_teachers, single_teacher
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__)


# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

#login
# @app.route('/api/login', methods = ['POST'])
# def login():
#     try:
#     # placeholder
#         teacher_id = request.json['teacher_id']
#         email = request.json['email']
#         password = request.json['password']
#         return teacher_id, 200
#     except Exception as e:
#         return e, 404

@app.route("/api/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "abshir" or password != "123456":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

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
