# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date

from flask import Blueprint
from flask import url_for
from flask import render_template
from flask import request
from flask import jsonify
from flask import Response
from flask import redirect
from flask_login import login_required
from flask_login import current_user

from mypackages.utils.date import get_next_month
from mypackages.utils.date import to_year_month_string
import mypackages.utils.jsonize as jsonize

from workscheduler.applications.errors import CalendarError
from workscheduler.applications.errors import RequestError
from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.services import SchedulerQuery
from workscheduler.applications.services import SkillQuery
from workscheduler.applications.services import OperatorQuery
from workscheduler.applications.web.util.functions.controller import admin_required
from workscheduler.applications.web import get_db_session
from ..adapters import SchedulerCommandAdapter
from ..forms import BaseSettingForm
from ..forms import YearlySettingForm


bp = Blueprint('schedulers', __name__, template_folder='../views', static_folder='../statics')


def _public_request_body(scheduler, monthly_setting):
    operator = OperatorQuery(get_db_session()).get_operator_of_user_id(current_user.id)
    return render_template('request-public.html',
                           operator=operator, schedule_of=monthly_setting.schedule_of,
                           scheduler=scheduler, monthly_setting=monthly_setting)


def _non_public_request_body(schedule_of):
    return render_template('request-non-public.html', schedule_of=schedule_of)


@bp.route('/my-requests')
@login_required
def show_my_request():
    calendar = request.args.get('calendar')
    
    if calendar and not isinstance(calendar, date):
        calendar = datetime.strptime(calendar, '%Y-%m').date()
    
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(current_user.affiliation.id)
    if not scheduler:
        return _non_public_request_body(calendar)
    
    monthly_setting = scheduler.month_year_setting(calendar.month, calendar.year)
    
    return _public_request_body(scheduler, monthly_setting)\
        if monthly_setting and monthly_setting.is_published and not monthly_setting.is_fixed\
        else _non_public_request_body(calendar)


@bp.route('/my-requests', methods=['POST'])
@login_required
def append_my_request():
    scheduler_id = request.args.get('scheduler')
    
    session = get_db_session()
    try:
        req = SchedulerCommandAdapter(session).append_my_request(
            scheduler_id, jsonize.loads(request.data))
        session.commit()
        
        session.refresh(req)
        response = Response(jsonize.dumps(req))
        response.status_code = 200
    except CalendarError as e:
        session.rollback()
        print(e)
        response = jsonify({
            'errorMessage': 'not allowed month is included in you request.'
        })
        response.status_code = 400
    except RequestError as e:
        session.rollback()
        print(e)
        response = jsonify({
            'errorMessage': 'some requests are overlapping.'
        })
        response.status_code = 400
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/my-requests/<requst_id>', methods=['POST'])
@login_required
def update_my_request(requst_id):
    pass


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
    monthly_setting = scheduler.month_year_setting(calendar.month, calendar.year)
    
    return redirect(url_for('schedulers.show_monthly_setting_inner', monthly_setting_id=monthly_setting.id)
                    + '?affiliation={}'.format(affiliation_id))


@bp.route('/monthly-settings/<monthly_setting_id>')
@login_required
@admin_required
def show_monthly_setting_inner(monthly_setting_id: str):
    affiliation_id = request.args.get('affiliation')
    
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(affiliation_id)
    monthly_setting = SchedulerQuery(session).get_month_year_setting(monthly_setting_id)
    operators = OperatorQuery(session).get_operators()

    return render_template('scheduler-monthly-setting.html',
                           scheduler=scheduler, monthly_setting=monthly_setting, operators=operators)


@bp.route('/monthly-settings/<monthly_setting_id>', methods=['POST'])
@login_required
@admin_required
def update_monthly_setting(monthly_setting_id: str):
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_monthly_setting(jsonize.loads(request.data))
        session.commit()
        
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/monthly-settings/<monthly_setting_id>/public', methods=['POST'])
@login_required
@admin_required
def public_monthly_setting(monthly_setting_id: str):
    session = get_db_session()
    try:
        update_monthly_setting(monthly_setting_id)
        SchedulerCommandAdapter(session).public_monthly_setting(monthly_setting_id)
        session.commit()
    
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/affiliations/<affiliation_id>/basic-option')
@login_required
@admin_required
def show_basic_option(affiliation_id: str):
    session = get_db_session()
    
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(affiliation_id)
    
    action = url_for('schedulers.update_basic_option', affiliation_id=affiliation_id, option_id=scheduler.id)
    
    skills = SkillQuery(session).get_skills()
    operators = OperatorQuery(session).get_operators()
    
    return render_template('scheduler-basic-option.html', action=action, form=BaseSettingForm(obj=scheduler),
                           skills=skills, operators=operators)


@bp.route('/affiliations/<affiliation_id>/basic-option/<option_id>', methods=['POST'])
@login_required
@admin_required
def update_basic_option(affiliation_id, option_id):
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_option(BaseSettingForm(request=request.form))
        session.commit()
        response = jsonify({
            'redirect': url_for('schedulers.show_month_year_setting',
                                affiliation_id=affiliation_id, schedule_of=to_year_month_string(get_next_month()))
        })
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/affiliations/<affiliation_id>/yearly-option')
@login_required
@admin_required
def show_yearly_option(affiliation_id: str):
    session = get_db_session()
    affiliation = AffiliationQuery(session).get_affiliation(affiliation_id)
    return render_template('scheduler-yearly-option.html',
                           form=YearlySettingForm(obj=type('temp', (object,), {
                               'affiliation': affiliation
                           })))


@bp.route('/affiliations/<affiliation_id>/schedule-of/<schedule_of>', methods=['POST'])
@login_required
@admin_required
def launch_scheduler(affiliation_id: str, schedule_of: str):
    if schedule_of and not isinstance(schedule_of, date):
        schedule_of = datetime.strptime(schedule_of, '%Y-%m').date()
    
    session = get_db_session()
    operators = OperatorQuery(session).get_operators()
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(affiliation_id)
    
    scheduler.run(schedule_of, operators)
    
    response = jsonify()
    return response
