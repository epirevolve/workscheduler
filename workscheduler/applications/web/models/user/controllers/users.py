# -*- coding: utf-8 -*-

from flask import (
    Blueprint, redirect,
    url_for, render_template, flash,
    Response, request
)
from flask_login import (
    login_required, current_user
)
from workscheduler.applications.services import (
    UserQuery, AffiliationQuery
)
from workscheduler.applications.web import get_db_session
from workscheduler.applications.web.util.functions.controller import admin_required
from ..forms import UserForm, UsersForm
from ..adapters import UserCommandAdapter


bp = Blueprint('users', __name__, template_folder='../views', static_folder="../statics")


@bp.route('/myself/<user_id>')
@login_required
def show_myself(user_id):
    return render_template('user.html', form=UserForm(obj=current_user))


@bp.route('/myself/<user_id>', methods=['POST'])
@login_required
def update_myself(user_id):
    session = get_db_session()
    UserCommandAdapter(session).update_myself(UserForm())
    session.commit()
    
    flash('My info is successfully changed.')
    
    return redirect(url_for('users.show_myself', user_id=current_user.id))


@bp.route('/')
@login_required
@admin_required
def show_users():
    session = get_db_session()
    users = UserQuery(session).get_users()
    affiliations = AffiliationQuery(session).get_affiliations()

    return render_template('users.html', form=UsersForm(), users=users, affiliations=affiliations)


@bp.route('/', methods=['POST'])
@login_required
@admin_required
def append_user():
    session = get_db_session()
    UserCommandAdapter(session).append_user(UsersForm())
    session.commit()

    flash('User was successfully registered.')
    flash('His/her password is p + his/her login id. Please change it.')
    
    return redirect(url_for('users.show_users'))


@bp.route('/<user_id>', methods=['POST'])
@login_required
@admin_required
def update_user(user_id):
    session = get_db_session()
    UserCommandAdapter(session).update_user(UsersForm())
    session.commit()

    flash('User was successfully registered.')
    
    return redirect(url_for('users.show_users'))


@bp.route('/<user_id>/reset-password', methods=['POST'])
@login_required
@admin_required
def reset_password(user_id):
    response = Response()

    session = get_db_session()
    try:
        UserCommandAdapter(session).reset_password(request.form)
        session.commit()
    
        response.status_code = 200
    except Exception as e:
        print(e)
        response.status_code = 400
        session.rollback()
    return response


@bp.route('/<user_id>/inactivate', methods=['POST'])
@login_required
@admin_required
def inactivate(user_id):
    response = Response()

    session = get_db_session()
    try:
        UserCommandAdapter(session).inactivate(request.form)
        session.commit()

        response.status_code = 200
    except Exception as e:
        print(e)
        response.status_code = 400
        session.rollback()
    return response
