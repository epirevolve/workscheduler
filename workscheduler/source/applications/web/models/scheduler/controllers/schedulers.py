# -*- coding: utf-8 -*-

from datetime import datetime

from flask import Blueprint
from flask import render_template
from flask import request
from flask import Response
from flask_login import login_required

from utils import jsonize
from utils.string import to_date

from applications.errors import AlreadyLaunchError
from applications.services import AffiliationQuery
from applications.services import SchedulerQuery
from applications.services import SkillQuery
from applications.services import OperatorQuery
from applications.web.util.functions.controller import admin_required
from applications.web import get_db_session
from ..adapters import SchedulerCommandAdapter


bp = Blueprint('schedulers', __name__, template_folder='../views', static_folder='../statics')


@bp.route('/menus')
@login_required
@admin_required
def show_menu():
    session = get_db_session()
    affiliations = AffiliationQuery(session).get_affiliations_without_default()
    return render_template('scheduler-menu.html', affiliations=affiliations)


@bp.route('/monthly-setting')
@login_required
@admin_required
def show_monthly_setting():
    affiliation_id = request.args.get('affiliation')
    calendar = to_date(request.args.get('calendar'), '%Y-%m')

    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(affiliation_id)
    monthly_setting = scheduler.monthly_setting(calendar.month, calendar.year)
    operators = OperatorQuery(session).get_operators()
    return render_template('scheduler-monthly-setting.html',
                           scheduler=scheduler, monthly_setting=monthly_setting, operators=operators)


@bp.route('/basic-setting')
@login_required
@admin_required
def show_basic_setting():
    affiliation_id = request.args.get('affiliation')
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(affiliation_id)
    skills = SkillQuery(session).get_skills()
    operators = OperatorQuery(session).get_operators()
    return render_template('scheduler-basic-setting.html',
                           scheduler=scheduler, skills=skills, operators=operators)


@bp.route('/basic-setting', methods=['PUT'])
@login_required
@admin_required
def update_basic_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_basic_setting(jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/yearly-settings')
@login_required
@admin_required
def show_yearly_setting():
    affiliation_id = request.args.get('affiliation')
    year = request.args.get('year') or datetime.now().year
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(affiliation_id)
    yearly_setting = scheduler.yearly_setting(year)
    session.commit()
    return render_template('scheduler-yearly-setting.html',
                           scheduler=scheduler, yearly_setting=yearly_setting)


@bp.route('/yearly-setting', methods=['PUT'])
@login_required
@admin_required
def update_yearly_setting():
    scheduler_id = request.args.get('scheduler_id')
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_yearly_setting(scheduler_id, jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/affiliations/<affiliation_id>/month/<month>/year/<year>', methods=['POST'])
@login_required
@admin_required
def launch_scheduler(affiliation_id: str, month: str, year: str):
    try:
        session = get_db_session()
        SchedulerCommandAdapter(session).launch(affiliation_id, month, year)
        response = Response()
    except AlreadyLaunchError as e:
        print(e)
        response = Response('already launched this affiliation scheduler. please wait util its completion.')
        response.status_code = 400
    except Exception as e:
        print(e)
        response = Response()
        response.status_code = 400
    return response
