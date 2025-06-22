from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from backend.config import selected_config
from backend.api.extentions import db

db = SQLAlchemy()
login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    CORS(app)
    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'main.login'

    from app.models import User
    from app.routes import bp as main_bp
    app.register_blueprint(main_bp)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    if app.app_context():
        from backend.api.database.models import (SpottedPiShot, SpottedPetTicket, LostPet, LostPetImage, User,
                                                 SpottedPetShot)
    return app
