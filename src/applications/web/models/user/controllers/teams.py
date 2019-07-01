# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import request
from flask import Response
from flask_login import login_required

from utils import jsonize

from applications.services import TeamQuery
from applications.web import get_db_session
from applications.web.util.functions.controller import admin_required
from ..adapters import TeamCommandAdapter
from ..adapters import TeamFacadeAdapter


bp = Blueprint('teams', __name__, template_folder='../views', static_folder="../statics")


@bp.route('/')
@login_required
@admin_required
def show_teams():
    team_repository = TeamQuery(get_db_session())
    teams = team_repository.get_teams()
    return render_template('teams.html', teams=teams)


@bp.route('/', methods=['POST'])
@login_required
@admin_required
def append_team():
    session = get_db_session()
    try:
        req = TeamFacadeAdapter(session).append_team(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/<team_id>', methods=['POST'])
@login_required
@admin_required
def update_team(team_id: str):
    session = get_db_session()
    try:
        req = TeamCommandAdapter(session).update_team(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/<team_id>', methods=['DELETE'])
@login_required
@admin_required
def remove_team(team_id: str):
    session = get_db_session()
    try:
        TeamCommandAdapter(session).remove_team(team_id)
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response
