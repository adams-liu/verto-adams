from flask import Flask
from database import db
from auth import auth_handler
from api import api_handler
from flask_cors import CORS
from flask_jwt_extended import JWTManager

def create_app():
   
    app = Flask(__name__, static_folder='../build', static_url_path='/')

    ## Setup Cross Origin Resource Sharing (CORS) 
    CORS(app)
    
    ## Setup connection to database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite3'
    
    ## Setup Flask-JWT-Extended extention
    app.secret_key = "SECRET_KEY"
    JWTManager(app)

    db.init_app(app)
    
    with app.app_context():
        
        ## register_blueprints
        app.register_blueprint(auth_handler)
        app.register_blueprint(api_handler)

        ## create a sqlite3 instance if it doesn't exist, else do nothing
        db.create_all()
        return app


app = create_app()

