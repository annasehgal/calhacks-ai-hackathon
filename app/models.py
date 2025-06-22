from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'user'  # optional, but can help avoid conflicts
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class LostPet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)


class PetShot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255))


class FoundPiShot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255))


class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    petshot_id = db.Column(db.Integer, db.ForeignKey('pet_shot.id'), nullable=False)

    STATUS_R = 'R'
    STATUS_U = 'U'

    status = db.Column(db.String(1), nullable=False, default=STATUS_U)

    def set_true(self):
        self.status = self.STATUS_R
        db.session.commit()

    def set_false(self):
        self.status = self.STATUS_U
        db.session.commit()



