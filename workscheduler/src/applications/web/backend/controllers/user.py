# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import redirect
from flask import url_for
from flask import render_template
from flask import flash
from flask_login import logout_user
from flask_login import current_user
from flask_login import login_required

from applications.web.backend.functions.controller import admin_required
from applications.web.backend.services import UserQuery
from applications.web.backend import get_db_session
from domains.models.user import UserRole

bp = Blueprint('user', __name__, template_folder='../../frontend/views', static_folder="../../frontend/statics")


def load_user(user_id):
    return UserQuery(get_db_session()).get_user(user_id)


@bp.route('/')
def index():
    if current_user and current_user.is_authenticated:
        return redirect(url_for('menu.show_menu'))
    return render_template('auth.html')


@bp.route('/auth/logout')
def logout():
    logout_user()
    flash('You were logged out')
    return render_template('auth.html')


@bp.route('/myself/<user_id>')
@login_required
def show_myself(user_id):
    return render_template('user.html')


@bp.route('/users')
@login_required
@admin_required
def show_users():
    session = get_db_session()
    users = UserQuery(session).get_users()
    teams = UserQuery(session).get_teams()
    roles = [UserRole.DEVELOPER, UserRole.ADMINISTRATOR, UserRole.OPERATOR]
    return render_template('users.html', users=users, teams=teams, roles=roles)


@bp.route('/teams')
@login_required
@admin_required
def show_teams():
    team_repository = UserQuery(get_db_session())
    teams = team_repository.get_teams()
    return render_template('teams.html', teams=teams)
