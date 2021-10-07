from database import db

class Employee(db.Model):

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
