import sys
sys.path.append('..')
from flask import Flask, jsonify, request, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, JWTManager , get_jwt, set_access_cookies, set_refresh_cookies, unset_jwt_cookies, get_jwt_header
from flask_cors import CORS
from datetime import timedelta
from utility.error_handlers import *
from utility.bcrypt_utils import *
from student.crud import *
from teacher.crud import *
from admin.crud import *
from datetime import datetime
from face_rec.load_fr_model import start_live_attendance
import threading

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
jwt = JWTManager(app)

ALLOWED_STATUS = ["present", "absent", "excused"]
ALLOWED_WEEK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

#Automatic refreshing is expiry time < 5 mins
@app.after_request
def refresh_expiring_jwt(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now()
        target_timestamp = datetime.timestamp(now + timedelta(minutes=5))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            refresh_token = create_refresh_token(identity=get_jwt_identity())
            response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=True, samesite='None')
            response.set_cookie('refresh_token_cookie', value=refresh_token, httponly=True, secure=True, samesite='None')
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


# populate user 123 with dummy password
dummy_password('123', hash_password("abshir"))
dummy_password('456', hash_password("naruto"))
admin_dummy_password('112233', hash_password("admin"))

#login route to create a jwt token for user
@app.route("/api/v1/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    try:
        hashed_password = teacher_password(int(username))
        if hashed_password is None:
            return error_response("Username does not exist", 401)
        #comapre user password with password in database
        if not compare_passwords(password, hashed_password['password']):
            return make_response(jsonify({"error": "Incorrect password"}), 401)
    except ValueError as e:
        return error_response("Invalid username format", 400)
    except Exception as e:
        print(e)
        return error_response("Unexpected server error", 500)

    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)
    response = make_response(jsonify({"message": "Login Successful"}), 200)
    response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=True, samesite='None')
    response.set_cookie('refresh_token_cookie', value=refresh_token, httponly=True, secure=True, samesite='None')
    return response

#login route to create a jwt token for user
@app.route("/api/v1/admin-login", methods=["POST"])
def admin_login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    try:
        hashed_password = admin_password(int(username))
        if hashed_password is None:
            return error_response("Username does not exist", 401)
        #comapre user password with password in database
        if not compare_passwords(password, hashed_password['password']):
            return make_response(jsonify({"error": "Incorrect password"}), 401)
    except ValueError as e:
        return error_response("Invalid username format", 400)
    except Exception as e:
        print(e)
        return error_response("Unexpected server error", 500)

    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)
    response = make_response(jsonify({"message": "Login Successful"}), 200)
    response.set_cookie('access_token_cookie', value=access_token, httponly=True, secure=True, samesite='None')
    response.set_cookie('refresh_token_cookie', value=refresh_token, httponly=True, secure=True, samesite='None')
    return response

#logout route to revoke jwt access
blacklist = set()
@jwt.token_in_blocklist_loader
def verify_token_not_blocklisted(jwt_header, jwt_payload):
    return check_if_token_blacklisted(jwt_payload)

def check_if_token_blacklisted(jwt_payload):
    jti = jwt_payload['jti']
    return jti in blacklist

@app.route('/api/v1/logout', methods=['POST'])
@jwt_required()
def logout():
    # Add the user's tokens to the blacklist
    jti = get_jwt()['jti']
    blacklist.add(jti)

    # Unset the JWT cookies to remove tokens from the browser
    response = make_response(jsonify({'message': 'Logout successful'}), 200)
    unset_jwt_cookies(response)

    return response


#get all classes for a teacher
@app.route("/api/v1/classes", methods=["GET"])
@jwt_required()
def get_classes():
    try:
        result = all_classes(get_jwt_identity())
    except Exception as e:
        return log_and_return_error("An unexpected error occurred while retrieving classes", 500, f"Error occurred while retrieving classes. Exception: {e}")
    
    if not result:
        return log_and_return_error("No classes found for the teacher", 204, f"No classes found for the teacher: {get_jwt_identity()}")
        
    return jsonify(result), 200


#get attendance list for a specific session with additional query v2
@app.route("/api/v2/attendance/<subject_code>/<session_number>/<week>", methods=["GET"])
@jwt_required()
def get_session_attendance_v2(subject_code, session_number, week):
    status = request.args.get('status')
    #validation checks on session number
    try:
        session_number = int(session_number)
    except ValueError:
        return log_and_return_error("Invalid session number format", 400, f"Invalid session number format: {session_number}")
 
    #validation checks on week
    try:
        if int(week) not in ALLOWED_WEEK:
            return log_and_return_error("Invalid week", 400, f"Invalid week: {week}")
    except ValueError:
        return log_and_return_error("Invalid week format", 400, f"Invalid week format: {week}")
    
    # validation checks on status
    if status is not None:
        if status not in ALLOWED_STATUS:
            return log_and_return_error("Invalid status", 400, f"Invalid status: {status}")

    try:
        result = session_attendance(subject_code, session_number, status, week)
    except ValueError as e:
        return log_and_return_error("Invalid data received while retrieving attendance", 400, f"Error while retrieving attendance. Exception: {e}")
    except KeyError as e:
        return log_and_return_error("Data not found while retrieving attendance", 404, f"Error while retrieving attendance. Exception: {e}")
    except Exception as e:
        return log_and_return_error("An unexpected error occurred while retrieving attendance", 500, f"Error while retrieving attendance. Exception: {e}")
    
    if not result:
        return log_and_return_error("No attendance data found", 204, f"No attendance data found for subject_code: {subject_code}, session_number: {session_number}, week: {week}, status: {status}")

    return jsonify(result), 200


#get attendance list for a specific session with additional query
@app.route("/api/v1/attendance/<subject_code>/<session_number>", methods=["GET"])
@jwt_required()
def get_session_attendance(subject_code, session_number):
    status = request.args.get('status')
    week = request.args.get('week')

    #validation checks on session number
    try:
        session_number = int(session_number)
    except ValueError:
        return log_and_return_error("Invalid session number format", 400, f"Invalid session number format: {session_number}")
    
    #validation checks on week
    try:
        if week is not None:  
            if int(week) not in ALLOWED_WEEK:
                return log_and_return_error("Invalid week", 400, f"Invalid week: {week}")
    except ValueError:
        return log_and_return_error("Invalid week format", 400, f"Invalid week format: {week}")

    # validation checks on status
    if status is not None:
        if status not in ALLOWED_STATUS:
            return log_and_return_error("Invalid status", 400, f"Invalid status: {status}")

    try:
        result = session_attendance(subject_code, session_number, status, week)
    except ValueError as e:
        return log_and_return_error("Invalid data received while retrieving attendance", 400, f"Error while retrieving attendance. Exception: {e}")
    except KeyError as e:
        return log_and_return_error("Data not found while retrieving attendance", 404, f"Error while retrieving attendance. Exception: {e}")
    except Exception as e:
        return log_and_return_error("An unexpected error occurred while retrieving attendance", 500, f"Error while retrieving attendance. Exception: {e}")
        
    
    if not result:
        return log_and_return_error("No attendance data found", 204, f"No attendance data found for subject_code: {subject_code}, session_number: {session_number}, week: {week}, status: {status}")

    return jsonify(result), 200


#get live attendance list for a specific session (list displayed while attendance recording is active)
@app.route("/api/v1/live-attendance/<subject_code>/<session_number>/<week>", methods=["GET"])
@jwt_required()
def get_live_session_attendance(subject_code, session_number, week):
    #validation checks on session number
    try:
        session_number = int(session_number)
    except ValueError:
        return log_and_return_error("Invalid session number format", 400, f"Invalid session number format: {session_number}")
 
    #validation checks on week
    try:
        if int(week) not in ALLOWED_WEEK:
            return log_and_return_error("Invalid week", 400, f"Invalid week: {week}")
    except ValueError:
        return log_and_return_error("Invalid week format", 400, f"Invalid week format: {week}")

    try:
        result = live_session_attendance(subject_code, session_number, week)
    except ValueError as e:
        return log_and_return_error("Invalid data received while retrieving live attendance", 400, f"Error while retrieving live attendance. Exception: {e}")
    except KeyError as e:
        return log_and_return_error("Data not found while retrieving live attendance", 404, f"Error while retrieving live attendance. Exception: {e}")
    except Exception as e:
        return log_and_return_error("An unexpected error occurred while retrieving live attendance", 500, f"Error while retrieving live attendance. Exception: {e}")
    
    if not result:
        return log_and_return_error("No live attendance data found", 204, f"No live attendance data found for subject_code: {subject_code}, session_number: {session_number}, week: {week}")

    return jsonify(result), 200


#get recent attendance list for a specific session (sorted by time)
@app.route("/api/v1/recent-attendance/<subject_code>/<session_number>/<week>", methods=["GET"])
@jwt_required()
def get_recent_session_attendance(subject_code, session_number, week):
    #validation checks on session number
    try:
        session_number = int(session_number)
    except ValueError:
        return log_and_return_error("Invalid session number format", 400, f"Invalid session number format: {session_number}")
 
    #validation checks on week
    try:
        if int(week) not in ALLOWED_WEEK:
            return log_and_return_error("Invalid week", 400, f"Invalid week: {week}")
    except ValueError:
        return log_and_return_error("Invalid week format", 400, f"Invalid week format: {week}")

    try:
        result = recent_session_attendance(subject_code, session_number, week)
    except ValueError as e:
        return log_and_return_error("Invalid data received while retrieving recent attendance", 400, f"Error while retrieving recent attendance. Exception: {e}")
    except KeyError as e:
        return log_and_return_error("Data not found while retrieving recent attendance", 404, f"Error while retrieving recent attendance. Exception: {e}")
    except Exception as e:
        return log_and_return_error("An unexpected error occurred while retrieving recent attendance", 500, f"Error while retrieving recent attendance. Exception: {e}")
    
    if not result:
        return log_and_return_error("No recent attendance data found", 204, f"No recent attendance data found for subject_code: {subject_code}, session_number: {session_number}, week: {week}")

    return jsonify(result), 200


#get teacher information for dashboard
@app.route("/api/v1/teacher-info", methods=["GET"])
@jwt_required()
def get_teacher_info():
    try:
        result = teacher_info(get_jwt_identity())
    except Exception as e:
        return log_and_return_error("An unexpected error occurred while retrieving teacher information", 500, f"Error while retrieving teacher information. Exception: {e}")
    
    if not result:
        return log_and_return_error("No teacher information data found", 204, f"No teacher information data found for teacher: {get_jwt_identity()}")
    
    return jsonify(result), 200


#get upcoming classes for a teacher in dashboard
@app.route("/api/v1/upcoming-classes", methods=["GET"])
@jwt_required()
def get_upcoming_classes():
    try:
        result = upcoming_classes(get_jwt_identity())
    except Exception as e:
        return log_and_return_error("An unexpected error occurred while retrieving upcoming classes", 500, f"Error while retrieving upcoming classes for teacher: {get_jwt_identity()}. Exception: {e}")
    
    if not result:
        return log_and_return_error("No upcoming classes data found", 204, f"No upcoming classes data found for teacher: {get_jwt_identity()}")
    

    return jsonify(result), 200


#get class counts for a teacher in dashboard
@app.route("/api/v1/class-counts", methods=["GET"])
@jwt_required()
def get_class_count():
    try:
        result = class_counts(get_jwt_identity())
    except Exception as e:
        return log_and_return_error("An unexpected error occurred while retrieving class count", 500, f"Error while retrieving class count for teacher: {get_jwt_identity()}. Exception: {e}")
    
    if not result:
        return log_and_return_error("No classes found", 204, f"No classes found for teacher: {get_jwt_identity()}")
    

    return jsonify(result), 200


def live_detection_thread(subject_code, session_number, week):
    start_live_attendance(subject_code, session_number, week)

#starting the attendance 
@app.route('/api/v1/start-attendance', methods = ['POST'])
@jwt_required()
def start_attendance():
    subject_code = request.json.get("subject_code", None)
    session_number = int(request.json.get("session_number", None))
    week = int(request.json.get("week", None))
    
    populate_attendance(subject_code, session_number, week)
    # function to open the camera goes here too 
    # function should have
    #  params of subject_code , session_number, week

    t = threading.Thread(target=live_detection_thread, args=(subject_code, session_number, week))
    t.start()

    return "Success", 200

# admin routes

#put teacher class assignment
@app.route("/api/v1/assign-teacher", methods=["PUT"])
@jwt_required()
def post_assign_teacher():
    teacher_id = request.json.get("teacher_id", None)
    subject_code = request.json.get("subject_code", None)
    session_number = request.json.get("session_number", None)

    assign_teacher(int(teacher_id), subject_code, int(session_number))
    
    return "Success", 200

#put unassign teacher from class
@app.route("/api/v1/unassign-teacher", methods=["PUT"])
@jwt_required()
def put_unassign_teacher():
    teacher_id = request.json.get("teacher_id", None)
    subject_code = request.json.get("subject_code", None)
    session_number = request.json.get("session_number", None)

    unassign_teacher(int(teacher_id), subject_code, int(session_number))
    
    return "Success", 200


#post enrol student to class
@app.route("/api/v1/enrol-student", methods=["POST"])
@jwt_required()
def post_enrol_student():
    student_id = request.json.get("student_id", None)
    subject_code = request.json.get("subject_code", None)
    session_number = request.json.get("session_number", None)

    enrol_student(int(student_id), subject_code, int(session_number))
    
    return "Success", 200

#get all the classes for a student
@app.route("/api/v1/student-classes/<student_id>", methods=["GET"])
@jwt_required()
def get_student_classes(student_id):
    
    result = student_classes(int(student_id))

    return jsonify(result), 200

#put edit student class
@app.route("/api/v1/edit-student", methods=["PUT"])
@jwt_required()
def put_edit_student():
    enrolment_id = request.json.get("enrolment_id", None)
    subject_code = request.json.get("subject_code", None)
    session_number = request.json.get("session_number", None)

    edit_student_class(int(enrolment_id), subject_code, int(session_number))

    return "Success", 200

#delete student enrolment
@app.route("/api/v1/unenrol-student/<enrolment_id>", methods=["DELETE"])
@jwt_required()
def delete_unrol_student(enrolment_id):
    unenrol_student(int(enrolment_id))
    return "Success", 200

#update student attendance
@app.route("/api/v1/update-attendance", methods=["PUT"])
@jwt_required()
def put_update_attendance():
    student_id = request.json.get("student_id", None)
    subject_code = request.json.get("subject_code", None)
    session_number = request.json.get("session_number", None)
    week  = request.json.get("week", None)
    status = request.json.get("status", None)
    
    update_attendance(int(student_id), subject_code, int(session_number), week, status)

    return "Success", 200

# Run flask application
if __name__ == '__main__':
    app.run(debug=True)
