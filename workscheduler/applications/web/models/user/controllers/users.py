# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from flask import Response
from flask import redirect
from flask import url_for
from flask import render_template
from flask import flash
from flask_login import login_required

import mypackages.utils.jsonize as jsonize

from workscheduler.applications.services import UserQuery
from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.web import get_db_session
from workscheduler.applications.web.util.functions.controller import admin_required
from ..forms import UsersForm
from ..adapters import UserCommandAdapter


bp = Blueprint('users', __name__, template_folder='../views', static_folder="../statics")


@bp.route('/myself/<user_id>')
@login_required
def show_myself(user_id):
    return render_template('user.html')


@bp.route('/myself/<user_id>', methods=['POST'])
@login_required
def update_myself(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).update_myself(jsonize.loads(request.data))
        session.commit()

        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


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
