from werkzeug.security import generate_password_hash, check_password_hash

from . import db
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'user'
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
    alt_text = db.Column(db.String(100), nullable=True)
    images = db.relationship('LostPetImage', backref='lost_pet', lazy=True, cascade='all, delete-orphan')


class LostPetImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lost_pet_id = db.Column(db.Integer, db.ForeignKey('lost_pet.id'), nullable=False)
    image_path = db.Column(db.String(255), nullable=False)


class SpottedPetShot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    alt_text = db.Column(db.String(100), nullable=True)
    media_url = db.Column(db.String(255))


@event.listens_for(SpottedPetShot, 'after_insert')
def create_ticket(mapper, connection, target):
    new_ticket = SpottedPetTicket(
        user_id=target.user_id,
        petshot_id=target.id,
        status=Ticket.STATUS_U
    )

    db.session.add(new_ticket)
    db.session.commit()

class SpottedPiShot(db.Model):
    __tablename__ = 'spotted_pi_shot'

    id = db.Column(db.Integer, primary_key=True)
    alt_text = db.Column(db.String(100), nullable=True)
    media_url = db.Column(db.String(255))
    ml_label_str = db.Column(db.String(255))
    ml_label_idx = db.Column(db.Integer)

    def return_match(self):
        return SpottedPetTicket.query.filter_by(petshot_id=self.id).first()



class SpottedPetTicket(db.Model):
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



