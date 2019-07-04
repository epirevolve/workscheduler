# -*- coding: utf-8 -*-

from datetime import datetime

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required
from flask_login import current_user

from utils.string import to_date
from utils import jsonize

from services import SchedulerQuery
from services import UserQuery
from services import OperatorQuery
from functions.controller import admin_required
from applications.backend import get_db_session


bp = Blueprint('scheduler', __name__, template_folder='../../frontend/views', static_folder="../../frontend/statics")


@bp.route('/menus')
@login_required
@admin_required
def show_menu():
    session = get_db_session()
    teams = UserQuery(session).get_teams_without_default()
    return render_template('scheduler-menu.html', teams=teams)


@bp.route('/monthly-settings')
@login_required
@admin_required
def show_monthly_setting():
    team_id = request.args.get('team')
    calendar = to_date(request.args.get('calendar'), '%Y-%m')

    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_team_id(team_id)
    monthly_setting = scheduler.monthly_setting(calendar.month, calendar.year)
    operators = OperatorQuery(session).get_operators()
    return render_template('scheduler-monthly-setting.html',
                           scheduler=scheduler, monthly_setting=monthly_setting, operators=operators)


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


@bp.route('/yearly-settings')
@login_required
@admin_required
def show_yearly_setting():
    team_id = request.args.get('team')
    year = request.args.get('year') or datetime.now().year
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_team_id(team_id)
    yearly_setting = scheduler.yearly_setting(year)
    return render_template('scheduler-yearly-setting.html',
                           scheduler=scheduler, yearly_setting=yearly_setting)


@bp.route('/launch-histories')
@login_required
@admin_required
def show_launch_histories():
    return render_template('scheduler-launch-history.html')


def _public_request_body(scheduler, monthly_setting):
    operator = OperatorQuery(get_db_session()).get_operator_of_user_id(current_user.id)
    return render_template('request-public.html',
                           operator=operator, schedule_of=monthly_setting.schedule_of,
                           scheduler=scheduler, monthly_setting=monthly_setting)


def _non_public_request_body(schedule_of):
    return render_template('request-non-public.html', schedule_of=schedule_of)


@bp.route('/')
@login_required
def show_my_request():
    schedule_of = to_date(request.args.get('schedule_of'), '%Y-%m')

    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_team_id(current_user.team.id)
    if not scheduler:
        return _non_public_request_body(schedule_of)

    monthly_setting = scheduler.monthly_setting(schedule_of.month, schedule_of.year)

    return _public_request_body(scheduler, monthly_setting) \
        if monthly_setting and monthly_setting.is_published and not monthly_setting.is_fixed \
        else _non_public_request_body(schedule_of)
