# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required
from flask_login import current_user

from utils.string import to_date

from backend.services import SchedulerQuery
from backend.services import UserQuery
from backend.services import OperatorQuery
from backend.functions.controller import admin_required
from applications.backend import get_db_session


bp = Blueprint('scheduler', __name__, template_folder='../../frontend/views', static_folder="../../frontend/statics")


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
    scheduler = SchedulerQuery(session).get_scheduler_of_team_id(team_id)
    skills = OperatorQuery(session).get_skills()
    operators = OperatorQuery(session).get_operators()
    return render_template('scheduler-basic-setting.html',
                           scheduler=scheduler, skills=skills, operators=operators)


@bp.route('/vacations')
@login_required
@admin_required
def show_vacations():
    team_id = request.args.get('team')
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_team_id(team_id)
    return render_template('vacations.html', scheduler=scheduler)


@bp.route('/launch-histories')
@login_required
@admin_required
def show_launch_histories():
    return render_template('scheduler-launch-history.html')


@bp.route('/requests')
@login_required
def show_my_request():
    schedule_of = to_date(request.args.get('schedule_of'), '%Y-%m')

    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_team_id(current_user.team.id)
    if not scheduler:
        return _non_public_request_body(schedule_of)

    monthly_setting = scheduler.monthly_setting(schedule_of.month, schedule_of.year)

    operator = OperatorQuery(get_db_session()).get_operator_of_user_id(current_user.id)
    return render_template('request.html',
                           operator=operator, schedule_of=monthly_setting.schedule_of,
                           scheduler=scheduler, monthly_setting=monthly_setting)
