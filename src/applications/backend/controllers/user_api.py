# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from flask_login import login_required

from utils import jsonize

from backend.services import UserQuery
from backend.functions.controller import admin_required
from backend.adapters import UserFacadeAdapter
from applications.backend import get_db_session

from ..adapters import UserCommandAdapter

bp = Blueprint('user_api', __name__)


@bp.route('/users', methods=['POST'])
@login_required
@admin_required
def append_user():
    session = get_db_session()
    try:
        req = UserCommandAdapter(session).append_user(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = jsonize.json_response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
    return response


@bp.route('/users/<user_id>', methods=['PUT'])
@login_required
@admin_required
def update_user(user_id):
    session = get_db_session()
    try:
        req = UserCommandAdapter(session).update_user(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = jsonize.json_response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
    return response


@bp.route('/users/<user_id>/activate', methods=['PUT'])
@login_required
@admin_required
def activate_user(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).activate(user_id)
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
        session.rollback()
    return response


@bp.route('/users/<user_id>/inactivate', methods=['PUT'])
@login_required
@admin_required
def inactivate_user(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).inactivate(user_id)
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
        session.rollback()
    return response


@bp.route('/users/<user_id>/reset-password', methods=['PUT'])
@login_required
@admin_required
def reset_password_user(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).reset_password(user_id)
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
        session.rollback()
    return response


@bp.route('/users/myself/<user_id>', methods=['PUT'])
@login_required
def update_myself(user_id):
    session = get_db_session()
    try:
        req = UserCommandAdapter(session).update_myself(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = jsonize.json_response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
    return response


@bp.route('/teams')
@login_required
def get_teams():
    teams = UserQuery(get_db_session()).get_teams_without_default()
    return jsonize.json_response(jsonize.dumps(teams))


@bp.route('/teams', methods=['POST'])
@login_required
@admin_required
def append_team():
    session = get_db_session()
    try:
        req = UserFacadeAdapter(session).append_team(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = jsonize.json_response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
    return response


@bp.route('/teams/<team_id>', methods=['PUT'])
@login_required
@admin_required
def update_team(team_id: str):
    session = get_db_session()
    try:
        req = UserCommandAdapter(session).update_team(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = jsonize.json_response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
    return response


@bp.route('/teams/<team_id>', methods=['DELETE'])
@login_required
@admin_required
def remove_team(team_id: str):
    session = get_db_session()
    try:
        UserCommandAdapter(session).remove_team(team_id)
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
    return response
