# -*- coding: utf-8 -*-

from datetime import (
    datetime, date
)

from flask import (
    Blueprint, render_template, jsonify,
    request, url_for
)
from flask_login import login_required

from mypackages.utils.date import (
    get_next_month, to_year_month_string
)
from workscheduler.applications.services import (
    AffiliationQuery, SchedulerQuery, SkillQuery,
    OperatorQuery, SchedulerFacade
)
from workscheduler.applications.web.util.functions.controller import admin_required
from workscheduler.applications.web import get_db_session
from ..adapters import SchedulerCommandAdapter
from ..forms import (
    SchedulerBasicOptionForm, SchedulerCalendarForm, SchedulerYearlyOptionForm
)

bp = Blueprint('schedulers', __name__, template_folder='../views', static_folder='../statics')


@bp.route('/menus')
@login_required
@admin_required
def show_menu():
    session = get_db_session()
    affiliations = AffiliationQuery(session).get_affiliations_without_default()
    
    return render_template('scheduler-menu.html', affiliations=affiliations)


@bp.route('/affiliations/<affiliation_id>/scheduler-of/<schedule_of>/calendars')
@login_required
@admin_required
def show_calendar(affiliation_id: str, schedule_of: str):
    if schedule_of and not isinstance(schedule_of, date):
        schedule_of = datetime.strptime(schedule_of, '%Y-%m').date()
    
    session = get_db_session()
    calendar, exist = SchedulerFacade(session).get_category_compensated_calendar(affiliation_id, schedule_of)
    operators = OperatorQuery(session).get_operators()
    
    action = url_for('schedulers.append_calendar', affiliation_id=affiliation_id, schedule_of=schedule_of) if exist\
        else url_for('schedulers.update_calendar', affiliation_id=affiliation_id,
                     schedule_of=schedule_of, calendar_id=calendar.id)
    
    return render_template('scheduler-calendar.html',
                           save_action=action, calendar=calendar, operators=operators)


@bp.route('/affiliations/<affiliation_id>/scheduler-of/<schedule_of>/calendars', methods=['POST'])
@login_required
@admin_required
def append_calendar(affiliation_id: str, schedule_of: str):
    pass


@bp.route('/affiliations/<affiliation_id>/scheduler-of/<schedule_of>/calendars/<calendar_id>', methods=['POST'])
@login_required
@admin_required
def update_calendar(affiliation_id: str, schedule_of: str, calendar_id: str):
    pass


@bp.route('/affiliations/<affiliation_id>/scheduler-of/<schedule_of>/calendars/<calendar_id>/public', methods=['POST'])
@login_required
@admin_required
def public_calendar(affiliation_id: str, schedule_of: str, calendar_id: str):
    pass


@bp.route('/affiliations/<affiliation_id>/basic-option')
@login_required
@admin_required
def show_basic_option(affiliation_id: str):
    session = get_db_session()
    
    option = SchedulerQuery(session).get_option_of_affiliation_id(affiliation_id)
    
    action = url_for('schedulers.append_basic_option', affiliation_id=affiliation_id) if not option\
        else url_for('schedulers.update_basic_option', option_id=option.id, affiliation_id=affiliation_id)

    skills = SkillQuery(session).get_skills()
    operators = OperatorQuery(session).get_operators()
    
    return render_template('scheduler-basic-option.html', action=action, form=SchedulerBasicOptionForm(obj=option),
                           skills=skills, operators=operators)


@bp.route('/affiliations/<affiliation_id>/basic-option', methods=['POST'])
@login_required
@admin_required
def append_basic_option(affiliation_id):
    session = get_db_session()
    try:
        req = SchedulerCommandAdapter(session).append_option(SchedulerBasicOptionForm(request=request.form))
        session.commit()
        response = jsonify({
            'redirect': url_for('schedulers.show_calendar',
                                affiliation_id=affiliation_id, schedule_of=to_year_month_string(get_next_month()))
        })
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/affiliations/<affiliation_id>/basic-option/<option_id>', methods=['POST'])
@login_required
@admin_required
def update_basic_option(option_id, affiliation_id):
    session = get_db_session()
    try:
        req = SchedulerCommandAdapter(session).update_option(SchedulerBasicOptionForm(request=request.form))
        session.commit()
        response = jsonify({
            'redirect': url_for('schedulers.show_calendar',
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
                           form=SchedulerYearlyOptionForm(obj=type('temp', (object,), {
                               'affiliation': affiliation
                           })))


@bp.route('/affiliations/<affiliation_id>/schedule-of/<schedule_of>', methods=['POST'])
@login_required
@admin_required
def launch_scheduler(affiliation_id: str, schedule_of: str):
    response = jsonify()
    return response
