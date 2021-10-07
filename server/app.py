from flask import Flask
from database import db
from api import api_handler
from flask_cors import CORS

def create_app():
   
    app = Flask(__name__, static_folder='../build', static_url_path='/')
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite3'
    db.init_app(app)
    
    with app.app_context():

        app.register_blueprint(api_handler)

        db.create_all()
        return app


app = create_app()

