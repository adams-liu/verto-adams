from enum import unique
from database import db
from sqlalchemy_utils import EmailType

class Employee(db.Model):
    """
    Employee Model:
    @first_name = String
    @last_name = String
    @employee_num = Integer
    @department = Enum(String)
    @serialize = Return object data in easily serializable format
    """
    __tablename__ = 'employee'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    employee_num = db.Column(db.Integer, unique=True, nullable=False)
    department = db.Column(db.Enum("SALES", "PRODUCT", "ENGINEERING", name="department"))


    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           "first_name": self.first_name,
           "last_name": self.last_name,
           "employee_num": self.employee_num,
           "department":self.department
       }


class User(db.Model):
    """
    User Model:
    @email = String
    @password = Email
    @serialize = Return object data in easily serializable format
    """
    __tablename__ = 'User'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(EmailType, unique=True)
    password = db.Column(db.String(100))
    # is_validated = db.Column(db.Boolean(),default = False)

    @property
    def serialize(self):
       """Return object data in easily serializable format"""
       return {
           "email": self.email,
           "password": self.password
       }
