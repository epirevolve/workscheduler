# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from flask import Response
from flask import render_template
from flask_login import login_required

from utils import jsonize

from applications.services import UserQuery
from applications.services import AffiliationQuery
from applications.web import get_db_session
from applications.web.util.functions.controller import admin_required
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
    return render_template('users.html', users=users, affiliations=affiliations)


@bp.route('/', methods=['POST'])
@login_required
@admin_required
def append_user():
    session = get_db_session()
    try:
        req = UserCommandAdapter(session).append_user(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/<user_id>', methods=['POST'])
@login_required
@admin_required
def update_user(user_id):
    session = get_db_session()
    try:
        req = UserCommandAdapter(session).update_user(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/<user_id>/reset-password', methods=['POST'])
@login_required
@admin_required
def reset_password(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).reset_password(user_id)
        session.commit()
        response = Response()
    except Exception as e:
        print(e)
        response = Response()
        response.status_code = 400
        session.rollback()
    return response


@bp.route('/<user_id>/inactivate', methods=['POST'])
@login_required
@admin_required
def inactivate(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).inactivate(user_id)
        session.commit()
        response = Response()
    except Exception as e:
        print(e)
        response = Response()
        response.status_code = 400
        session.rollback()
    return response
