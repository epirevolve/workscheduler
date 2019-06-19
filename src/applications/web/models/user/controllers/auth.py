# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import redirect
from flask import url_for
from flask import render_template
from flask import flash
from flask import request
from flask_login import login_user
from flask_login import logout_user
from flask_login import current_user

from utils import jsonize

from applications.services import UserQuery
from applications.web import get_db_session
from ..adapters import AuthFacadeAdapter


bp = Blueprint('auths', __name__, template_folder='../views', static_url_path="../statics")


def load_user(user_id):
    return UserQuery(get_db_session()).get_user(user_id)


@bp.route('/')
def index():
    if current_user and current_user.is_authenticated:
        return redirect(url_for('menus.show_menu'))
    return render_template('auth.html')


@bp.route('/auth/login', methods=['POST'])
def login():
    user = AuthFacadeAdapter(get_db_session()).login(jsonize.to_dict(request.form))
    if not user:
        flash('Invalid username or password, or inactivated user', 'error')
        return index()
    login_user(user)
    flash('You were logged in')
    return redirect(url_for('menus.show_menu'))


@bp.route('/auth/logout')
def logout():
    logout_user()
    flash('You were logged out')
    return render_template('auth.html')
