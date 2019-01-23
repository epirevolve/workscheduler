# -*- coding: utf-8 -*-

from flask import (
    Blueprint, redirect, url_for,
    render_template, flash
)
from flask_login import (
    login_user, logout_user
)
from workscheduler.applications.services import UserQuery
from ..adapters import AuthCommandAdapter
from ..forms import AuthForm
from .. import get_db_session


bp = Blueprint('auths', __name__)


def load_user(user_id):
    return UserQuery(get_db_session()).get_user(user_id)


@bp.route('/')
def index():
    return render_template('auth.html', form=AuthForm())


@bp.route('/auth/login', methods=['POST'])
def login():
    form = AuthForm()
    user = AuthCommandAdapter(get_db_session()).login(form)
    if not user:
        flash('Invalid username or password, or inactivated user', 'error')
        return render_template('auth.html', form=form)
    login_user(user)
    flash('You were logged in')
    return redirect(url_for('menus.show_menu'))


@bp.route('/auth/logout')
def logout():
    logout_user()
    flash('You were logged out')
    return render_template('auth.html', form=AuthForm())
