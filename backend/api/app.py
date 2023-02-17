from flask import Flask, jsonify, request, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, JWTManager
from flask_cors import CORS
from datetime import timedelta
from utility.error_handlers import *
from student.read import *
from teacher.read import *

app = Flask(__name__)
CORS(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)

ALLOWED_STATUS = ["present", "absent", "excused"]
ALLOWED_WEEK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

#login route to create a jwt token for user
@app.route("/api/v1/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "123" or password != "abshir":
        return make_response(jsonify({"error": "Bad username or password"}), 401)

    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)
    response = make_response(jsonify({"message": "Login Successful"}), 200)
    response.set_cookie('access_token_cookie', access_token, httponly=True)
    response.set_cookie('refresh_token_cookie', refresh_token, httponly=True)
    
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

#tester
@app.route("/api/test/classes", methods=["GET"])
#@jwt_required()
def test_get_classes():
    result = all_classes(123)
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

#tester
@app.route("/api/test/attendance/<subject_code>/<session_number>", methods=["GET"])
def test_get_session_attendance(subject_code, session_number):
    status = request.args.get('status')
    week = request.args.get('week')
    result = session_attendance(subject_code, session_number, status, week)
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

#tester
@app.route("/api/test/live-attendance/<subject_code>/<session_number>/<week>", methods=["GET"])
def test_get_live_session_attendance(subject_code, session_number, week):
    result = live_session_attendance(subject_code, session_number, week)
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

#tester
@app.route("/api/test/recent-attendance/<subject_code>/<session_number>/<week>", methods=["GET"])
def test_get_recent_session_attendance(subject_code, session_number, week):
    result = recent_session_attendance(subject_code, session_number, week)
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

#tester
@app.route("/api/test/teacher-info", methods=["GET"])
#@jwt_required()
def test_get_teacher_info():
    result = teacher_info(123)
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

#tester
@app.route("/api/test/upcoming-classes", methods=["GET"])
#@jwt_required()
def test_get_upcoming_classes():
    result = upcoming_classes(123)
    return jsonify(result), 200

#starting the attendance 
@app.route('/api/v1/start-recognition', methods = ['GET'])
@jwt_required()
def start_recognition():
    return "Success", 200


# Run flask application
if __name__ == '__main__':
    app.run(debug=True)
