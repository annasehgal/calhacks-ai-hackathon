from flask import Blueprint, jsonify
from .models import Ticket, db

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


from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required, current_user
from .models import db, User
from .forms import LoginForm, SignupForm

bp = Blueprint('main', __name__)


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
