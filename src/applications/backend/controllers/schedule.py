# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required
from flask_login import current_user

from backend.services import UserQuery
from applications.backend import get_db_session
from domains.models.user import UserRole

from utils.array import find

bp = Blueprint('schedule', __name__, template_folder='../../frontend/views', static_folder="../../frontend/statics")


def show_schedules_operator():
    return render_template('schedule-operator.html', team=current_user.team)


def show_schedules_administrator():
    teams = UserQuery(get_db_session()).get_teams_without_default()
    team_id = request.args.get('team_id')
    if team_id:
        team = find(lambda x: x.id == team_id, teams)
    else:
        team = teams[0]
    return render_template('schedule-admin.html', teams=teams, team=team)


@bp.route('/')
@login_required
def show_schedules():
    if current_user.role == UserRole.Operator:
        return show_schedules_operator()
    else:
        return show_schedules_administrator()
