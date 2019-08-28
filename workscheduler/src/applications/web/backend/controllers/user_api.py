# -*- coding: utf-8 -*-

import traceback

from flask import Blueprint
from flask import request
from flask import current_app
from flask_login import login_required
from flask_login import login_user

from utils import jsonize

from applications.web.backend.functions.controller import admin_required
from applications.web.backend.adapters import UserFacadeAdapter
from applications.web.backend.adapters import UserCommandAdapter
from applications.web.backend.services import UserQuery
from applications.web.backend import get_db_session


bp = Blueprint('user_api', __name__)


@bp.route('/auth/login', methods=['POST'])
def login():
    user = UserFacadeAdapter(get_db_session()).login(jsonize.loads(request.data))
    if not user:
        return jsonize.json_response(status_code=400)
    login_user(user)
    return jsonize.json_response()


@bp.route('/users', methods=['POST'])
@login_required
@admin_required
def append_user():
    session = get_db_session()
    try:
        UserFacadeAdapter(session).append_user(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/users/<user_id>', methods=['PUT'])
@login_required
@admin_required
def update_user(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).save_user(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/users/<user_id>/activate', methods=['PUT'])
@login_required
@admin_required
def activate_user(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).activate_user(user_id)
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/users/<user_id>/inactivate', methods=['PUT'])
@login_required
@admin_required
def inactivate_user(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).inactivate_user(user_id)
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/users/<user_id>/reset-password', methods=['PUT'])
@login_required
@admin_required
def reset_password_user(user_id):
    session = get_db_session()
    try:
        UserCommandAdapter(session).reset_user_password(user_id)
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
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
        UserFacadeAdapter(session).append_team(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/teams/<team_id>', methods=['PUT'])
@login_required
@admin_required
def update_team(team_id: str):
    session = get_db_session()
    try:
        UserCommandAdapter(session).save_team(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
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
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response
