# -*- coding: utf-8 -*-

from workscheduler.applications.services.authentication_service import AuthenticationService
from workscheduler.infrastructures.user_repository import UserRepository
from flask import Blueprint, request, redirect, url_for, render_template, flash
from flask_login import login_user, logout_user, login_required
from ..db import get_db_session
from collections import namedtuple


bp = Blueprint('auths', __name__)


def load_user(user_id):
    user, role = UserRepository(get_db_session()).get_user(user_id)
    CurrentUser = namedtuple('CurrentUser', ('login_id', 'password', 'name', 'role',
                                             'is_authenticated', 'is_active', 'is_anonymous', 'get_id'))
    return CurrentUser(user.login_id, user.password, user.name, role,
                       user.is_authenticated(), user.is_active(), user.is_anonymous(), user.get_id())


@bp.route('/', methods=['GET'])
def index():
    return render_template('login.html')


@bp.route('/login', methods=['POST'])
def login():
    user, role = AuthenticationService(get_db_session()).login(request.form['login_id'], request.form['password'])
    if not user:
        flash('Invalid username or password', 'error')
        return render_template('login.html')
    login_user(user)
    flash('You were logged in')
    return redirect(url_for('menus.show_menu'))


@login_required
@bp.route('/logout')
def logout():
    logout_user()
    flash('You were logged out')
    return redirect(url_for('auths.index'))
