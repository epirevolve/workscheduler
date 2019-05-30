# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date

from flask import Blueprint
from flask import url_for
from flask import render_template
from flask import request
from flask import Response
from flask import redirect
from flask_login import login_required

from utils import jsonize

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


@bp.route('/monthly-settings')
@login_required
@admin_required
def show_monthly_setting():
    affiliation_id = request.args.get('affiliation')
    calendar = request.args.get('calendar')
    if calendar and not isinstance(calendar, date):
        calendar = datetime.strptime(calendar, '%Y-%m').date()
    
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(affiliation_id)
    monthly_setting = scheduler.monthly_setting(calendar.month, calendar.year)
    
    return redirect(url_for('schedulers.show_monthly_setting_inner',
                            monthly_setting_id=monthly_setting.id, affiliation=affiliation_id))


@bp.route('/monthly-settings/<monthly_setting_id>')
@login_required
@admin_required
def show_monthly_setting_inner(monthly_setting_id: str):
    affiliation_id = request.args.get('affiliation')
    
    session = get_db_session()
    scheduler_query = SchedulerQuery(session)
    scheduler = scheduler_query.get_scheduler_of_affiliation_id(affiliation_id)
    monthly_setting = scheduler_query.get_monthly_setting(monthly_setting_id)
    operators = OperatorQuery(session).get_operators()

    return render_template('scheduler-monthly-setting.html',
                           scheduler=scheduler, monthly_setting=monthly_setting,
                           operators=operators)


@bp.route('/monthly-settings', methods=['POST'])
@login_required
@admin_required
def update_monthly_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_monthly_setting(jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/monthly-settings/public', methods=['POST'])
@login_required
@admin_required
def public_monthly_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).public_monthly_setting(jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/basic-setting')
@login_required
@admin_required
def show_basic_setting():
    affiliation_id = request.args.get('affiliation')
    scheduler = SchedulerQuery(get_db_session()).get_scheduler_of_affiliation_id(affiliation_id)
    return redirect(url_for('schedulers.show_basic_setting_inner', scheduler_id=scheduler.id))


@bp.route('/basic-setting/<scheduler_id>')
@login_required
@admin_required
def show_basic_setting_inner(scheduler_id: str):
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler(scheduler_id)
    skills = SkillQuery(session).get_skills()
    operators = OperatorQuery(session).get_operators()
    return render_template('scheduler-basic-setting.html',
                           scheduler=scheduler, skills=skills, operators=operators)


@bp.route('/basic-setting', methods=['POST'])
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
    return redirect(url_for('schedulers.show_yearly_setting_inner',
                            yearly_setting_id=yearly_setting.id, scheduler_id=scheduler.id))


@bp.route('/yearly-settings/<yearly_setting_id>')
@login_required
@admin_required
def show_yearly_setting_inner(yearly_setting_id):
    scheduler_id = request.args.get('scheduler_id')
    session = get_db_session()
    scheduler_query = SchedulerQuery(session)
    scheduler = scheduler_query.get_scheduler(scheduler_id)
    yearly_setting = scheduler_query.get_yearly_setting(yearly_setting_id)
    return render_template('scheduler-yearly-setting.html',
                           scheduler=scheduler, yearly_setting=yearly_setting)


@bp.route('/yearly-setting/<yearly_setting_id>', methods=['POST'])
@login_required
@admin_required
def update_yearly_setting(yearly_setting_id):
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