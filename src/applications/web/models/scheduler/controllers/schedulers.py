# -*- coding: utf-8 -*-

from datetime import datetime

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required

from utils.string import to_date

from applications.services import TeamQuery
from applications.services import SchedulerQuery
from applications.services import SkillQuery
from applications.services import OperatorQuery
from applications.web.util.functions.controller import admin_required
from applications.web import get_db_session


bp = Blueprint('schedulers', __name__, template_folder='../views', static_folder='../statics')


@bp.route('/menus')
@login_required
@admin_required
def show_menu():
    session = get_db_session()
    teams = TeamQuery(session).get_teams_without_default()
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
    skills = SkillQuery(session).get_skills()
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