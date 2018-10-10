# -*- coding: utf-8 -*-

from workscheduler.applications.services.authentication_service import AuthenticationService
from workscheduler.infrastructures.user_repository import UserRepository
from flask import Blueprint, request, redirect, url_for, render_template, flash
from flask_login import login_user, logout_user, current_user
from .. import get_db_session


bp = Blueprint('auths', __name__)


def load_user(user_id):
    return UserRepository(get_db_session()).get_user(user_id)


@bp.route('/', methods=['GET'])
def index():
    return render_template('login.html')


@bp.route('/login', methods=['POST'])
def login():
    user = AuthenticationService(get_db_session()).login(request.form['login_id'], request.form['password'])
    if not user:
        flash('Invalid username or password', 'error')
        return render_template('login.html')
    login_user(user)
    flash('You were logged in')
    return redirect(url_for('menus.show_menu'))


@bp.route('/logout')
def logout():
    logout_user()
    flash('You were logged out')
    return render_template('login.html')
