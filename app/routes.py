from flask import Blueprint, jsonify
from .models import Ticket, db
from flask import render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required, current_user
from .models import User
from .forms import LoginForm, SignupForm

bp = Blueprint('main', __name__)

@bp.route('/ticket/<int:id>/approve', methods=['POST'])
def set_ticket_true(id):
    ticket = Ticket.query.get_or_404(id)
    ticket.set_true()
    return jsonify({'status': ticket.status})

@bp.route('/ticket/<int:id>/reject', methods=['POST'])
def set_ticket_false(id):
    ticket = Ticket.query.get_or_404(id)
    ticket.set_false()
    return jsonify({'status': ticket.status})


@bp.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        existing_user = User.query.filter_by(username=form.username.data).first()
        if existing_user:
            flash('Username already taken')
            return redirect(url_for('main.signup'))

        user = User(username=form.username.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Account created. Please log in.')
        return redirect(url_for('main.login'))
    return render_template('signup.html', form=form)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            return redirect(url_for('main.dashboard'))
        flash('Invalid credentials')
    return render_template('login.html', form=form)


@bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.')
    return redirect(url_for('main.login'))


@bp.route('/dashboard')
@login_required
def dashboard():
    return f'Hello, {current_user.username}!'


@bp.route('/upload_images/<int:pet_id>', methods=['POST'])
def upload_images(pet_id):
    pet = LostPet.query.get_or_404(pet_id)
    files = request.files.getlist('images')

    existing_count = len(pet.images)
    if existing_count + len(files) > 50:
        return "Cannot upload more than 50 images.", 400

    for file in files:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        new_image = LostPetImage(lost_pet_id=pet.id, image_path=filename)
        db.session.add(new_image)

    db.session.commit()
    return redirect(url_for('main.view_pet', pet_id=pet.id))
