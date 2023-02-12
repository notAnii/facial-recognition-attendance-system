from flask import jsonify
from app import app
import logging 
from logging.handlers import RotatingFileHandler

# Setup error loggers
handler = RotatingFileHandler('error.log', maxBytes=10000, backupCount=0)
handler.setLevel(logging.ERROR)
formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
handler.setFormatter(formatter)
app.logger.addHandler(handler)

# Returns error with json format and corresponding status code
def error_response(message, status_code):
    response = jsonify({"error": message})
    response.status_code = status_code
    return response

# Logs and returns the error by invoking error_response function
def log_and_return_error(message, status_code, error_log=None):
    if error_log:
        app.logger.error("["+str(status_code) + "] " +error_log)
    return error_response(message, status_code)