# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required

from applications.services import UserQuery
from applications.services import OperatorQuery
from applications.web.functions.controller import admin_required
from applications.web.database import get_db_session


bp = Blueprint('scheduler', __name__, template_folder='../../../../frontend/web/views', static_folder="../../../../frontend/web/statics")


@bp.route('/menu')
@login_required
@admin_required
def show_menu():
    session = get_db_session()
    teams = UserQuery(session).get_teams_without_default()
    return render_template('scheduler-menu.html', teams=teams)


@bp.route('/monthly-setting')
@login_required
@admin_required
def show_monthly_setting():
    team_id = request.args.get('team')
    session = get_db_session()
    team = UserQuery(session).get_team(team_id)
    operators = OperatorQuery(session).get_active_operators_of_team_id(team_id)
    return render_template('scheduler-monthly-setting.html', team=team, operators=operators)


@bp.route('/basic-setting')
@login_required
@admin_required
def show_basic_setting():
    team_id = request.args.get('team')
    session = get_db_session()
    team = UserQuery(session).get_team(team_id)
    skills = OperatorQuery(session).get_skills()
    operators = OperatorQuery(session).get_operators()
    return render_template('scheduler.html',
                           team=team, skills=skills, operators=operators)


@bp.route('/vacations')
@login_required
@admin_required
def show_vacations():
    team_id = request.args.get('team')
    session = get_db_session()
    team = UserQuery(session).get_team(team_id)
    return render_template('vacations.html', team=team)


@bp.route('/launch-histories')
@login_required
@admin_required
def show_launch_histories():
    return render_template('scheduler-launch-history.html')


@bp.route('/requests')
@login_required
def show_my_request():
    return render_template('request.html')
