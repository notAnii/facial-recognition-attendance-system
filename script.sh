#!/bin/bash 
source venv/Scripts/activate
cd backend/api
python app.py &
cd ../../frontend
yarn dev