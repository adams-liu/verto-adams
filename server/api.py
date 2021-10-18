from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from model import Employee 
from database import db
import re

api_handler = Blueprint('api_handler', __name__)
regex_pattern = "^[A-Z-]*$" ## only accepts capital letters and dashes

@api_handler.errorhandler(404)
def not_found(e):
    return api_handler.send_static_file('index.html')


@api_handler.route('/')
def index():
    return api_handler.send_static_file('index.html')


@api_handler.route('/api/employee', methods = ["POST","GET"])
@jwt_required()
def employees():
    '''REST API functions related to creating and retrieving employees'''

    if request.method == 'GET':
        
        ## obtain query parameters
        fname = request.args.get('fname').upper() if request.args.get('fname') else ''
        lname = request.args.get('lname').upper() if request.args.get('lname') else ''
        employee_num = request.args.get('employee_num')
        department = request.args.get('department')

        query = db.session.query(Employee)

        ## filter query results by request parameters
        if department:
            query = query.filter(Employee.department==department)
        if employee_num:
            query = query.filter(Employee.employee_num==employee_num)
        elif fname:
            query = query.filter(Employee.first_name==fname)
        elif lname:
            query = query.filter(Employee.last_name==lname)

        ## query is only executed when all() is called
        result = query.all()

        if not result:
            return {"Error":"No results found, please try another query."}

        ## return serialized json output
        return {"count":len(result),"employees":[employee.serialize for employee in result]}, 200


    if request.method == 'POST':
        request_data = request.get_json()
        
        error = []
        ## check to see if there are missing inputs
        if 'first_name' not in request_data:
            error.append('First name is required.')
        if 'last_name' not in request_data:
            error.append('Last name is required.')
        if 'employee_num' not in request_data:
            error.append('Employee number is required.')
        if 'department' not in request_data:
            error.append('Department is required.')
        if error:
            return {"Error":str(error)}, 400
        
        ## extracting data from request file
        first_name = request_data['first_name'].upper()
        last_name = request_data['last_name'].upper()
        employee_num = int(request_data['employee_num'])
        department = request_data['department'].upper()

        ## ensure that the employee number is 8 digits
        if employee_num < 10000000:
            employee_num += 10000000

        ## query to check for existing employee
        existing_employee = Employee.query.filter_by(employee_num=employee_num).first()

        department_list = ['SALES','PRODUCT','ENGINEERING'] 
        
        ## check to see that values provided meet conditions
        if not re.match(regex_pattern,first_name):
            return {'Error': 'First name must only contain letters and dashes'}, 400
        if not re.match(regex_pattern,last_name):
            return {'Error': 'Last name must only contain letters and dashes'}, 400
        if type(employee_num) != int or existing_employee or employee_num < 10000000 or employee_num>=100000000:
            return {'Error': 'Invalid employee number, ensure number doesnt already exist'}, 400
        if department not in department_list:
            return {'Error': 'Department not in list of departments'}, 400
        
        ## create Employee object and insert to db
        employee = Employee(first_name=first_name,last_name=last_name,employee_num=employee_num,department=department)
        db.session.add(employee)
        db.session.commit()

        return {"employee":employee.serialize}, 200





@api_handler.route('/api/employee/<employee_num>', methods = ["GET","PUT","DELETE"])
@jwt_required()
def oneEmployee(employee_num):
    '''REST API functions related to single employee'''
    employee = Employee.query.filter_by(employee_num=employee_num).first()
    if request.method == 'GET':
        if employee:
            return employee.serialize, 200
        else:
            return {"Error":"Employee number doesn't exists"}, 400
    
    if request.method == 'DELETE':
        if employee:
            db.session.delete(employee)
            db.session.commit()
            return {"Success":f"Employee {employee.first_name} {employee.last_name} successfully deleted!"}, 200
        else:
            return {"Error":"Employee doesn't exists"}, 400
    
    ## this request is very similar to the post request
    ## except no modification for employee number
    if request.method == 'PUT':
        if not employee:
            return {"Error":"Employee doesn't exists"}, 400
            
        else:
            request_data = request.get_json()

            error = []
            ## check to see if there are missing inputs
            if 'first_name' not in request_data:
                error.append('First name is required.')
            if 'last_name' not in request_data:
                error.append('Last name is required.')
            if 'department' not in request_data:
                error.append('Department is required.')
            if error:
                return {"Error":str(error)}, 400
            
            ## extracting data from request file
            first_name = request_data['first_name'].upper()
            last_name = request_data['last_name'].upper()
            department = request_data['department'].upper()

            department_list = ['SALES','PRODUCT','ENGINEERING'] 
            
            ## check to see that values provided meet conditions
            if not re.match(regex_pattern,first_name):
                return {'Error': 'First name must only contain letters and dashes'}, 400
            if not re.match(regex_pattern,last_name):
                return {'Error': 'Last name must only contain letters and dashes'}, 400
            if department not in department_list:
                return {'Error': 'Department not in list of departments'}, 400
            
            ## update values of existing objects
            employee.first_name = first_name
            employee.last_name = last_name
            employee.department = department

            ## create Employee object and insert to db
            db.session.add(employee)
            db.session.commit()

            return {"employee":employee.serialize}, 200
                

            
                  
        


