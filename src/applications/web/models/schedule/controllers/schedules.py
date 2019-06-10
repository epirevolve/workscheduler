# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required
from flask_login import current_user

from applications.services import TeamQuery
from applications.web import get_db_session

bp = Blueprint('schedules', __name__, template_folder='../views', static_folder='../statics')


def show_schedules_operator():
    return render_template('schedule-operator.html', team=current_user.team)


def show_schedules_administrator():
    teams = TeamQuery(get_db_session()).get_teams_without_default()
    team_id = request.args.get('team_id')
    if team_id:
        team = list(filter(lambda x: x.id == team_id, teams))[0]
    else:
        team = teams[0]
    return render_template('schedule-admin.html', teams=teams, team=team)


@bp.route('/')
@login_required
def show_schedules():
    if current_user.is_operator:
        return show_schedules_operator()
    else:
        return show_schedules_administrator()
