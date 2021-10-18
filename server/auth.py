from flask import Blueprint, request, jsonify, session, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from model import User
from database import db
import re

auth_handler = Blueprint('auth_handler', __name__)

@auth_handler.route('/auth/login',methods=['GET','POST'])
def login():
    '''
    Login API to obtain session authentication
        @body : {
            "email" : <email>,
            "password" : <password>
        }
    '''
    if request.method == 'POST':
        request_data = request.get_json()

        ## check to see if there are missing inputs
        error = []
        if 'email' not in request_data:
            error.append('Email is required.')
        if 'password' not in request_data:
            error.append('Password is required.')
        if error:
            return {"Error":error}
        
        email = request_data['email'].lower()
        password = request_data['password'].lower()


        # check to see if valid email string
        if not re.match(r"[^@]+@[^@]+\.[^@]+",email):
            return {"Error":f"Incorrect email input!"}, 400

        ## check if email and password exist
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password,password):
            return {"Error" : "Username and Password credentials does not match!"}

        ## create an access token
        access_token = create_access_token(identity=email)
        return {"access_token":access_token}, 200

    return {"Message":"PLEASE LOG IN"}
    


@auth_handler.route('/auth/signup',methods=['GET','POST'])
def signup():
    '''
    Register API to create User account
        @body : {
            "email" : <email>,
            "password" : <password>
        }
    '''
    if request.method == 'POST':
        request_data = request.get_json()
        error = []

        ## check to see if there are missing inputs
        if 'email' not in request_data:
            error.append('Email is required.')
        if 'password' not in request_data:
            error.append('Password is required.')
        if error:
            return {"Error":error}

        email = request_data['email'].lower()
        password = request_data['password'].lower()

        # check to see if valid email string
        if not re.match(r"[^@]+@[^@]+\.[^@]+",email):
            return {"Error":f"Incorrect email input!"}

        user = User.query.filter_by(email=email).first()
        if user:
            return {"Error":f"Email '{email}' already exist!"}
        
        ## Create new user object 
        new_user = User(email=email,password = generate_password_hash(password,method='sha256'))
        db.session.add(new_user)
        db.session.commit()
        return {"Success":"Signup Successful!"}, 200
    return {"Message":"PLEASE REGISTER"}


@auth_handler.route('/logout')
## By default this is a GET request
def logout():
    '''
    Logout API to destroy a session
    '''
    if "email" in session:
        session.pop("email",None)
        return {"Success":"Logged out!"}
    return{"Error":"User needs to be logged in!"}, 403