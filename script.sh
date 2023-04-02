#!/bin/bash 
source venapi/Scripts/activate
cd backend/api
python app.py &
cd ../../frontend
yarn dev