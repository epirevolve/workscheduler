# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import Response
from flask_login import login_required

from utils import jsonize

from applications.services import TeamQuery
from applications.web import get_db_session
from applications.web.util.functions.controller import admin_required

from ..adapters import UserCommandAdapter

bp = Blueprint('users_api', __name__)


@bp.route('/users/<user_id>/activate', methods=['PUT'])
@login_required
@admin_required
def activate(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).activate(user_id)
        session.commit()
        response = Response()
    except Exception as e:
        print(e)
        response = Response()
        response.status_code = 400
        session.rollback()
    return response


@bp.route('/users/<user_id>/inactivate', methods=['PUT'])
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


@bp.route('/users/<user_id>/reset-password', methods=['PUT'])
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


@bp.route('/teams')
@login_required
def teams():
    return Response(jsonize.dumps(TeamQuery(get_db_session()).get_teams_without_default()))
