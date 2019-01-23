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
    OperatorQuery
)
from workscheduler.domains.models.scheduler import Calendar
from . import admin_required
from .. import get_db_session
from ..adapters import SchedulerCommandAdapter
from ..forms import (
    SchedulerBasicOptionForm, SchedulerCalendarForm, SchedulerYearlyOptionForm
)

bp = Blueprint('schedulers', __name__)


@bp.route('/schedulers/menu')
@login_required
@admin_required
def show_menu():
    session = get_db_session()
    affiliations = AffiliationQuery(session).get_affiliations_without_default()
    
    return render_template('scheduler-menu.html', affiliations=affiliations)


@bp.route('/schedulers/affiliations/<affiliation_id>/scheduler-of/<schedule_of>')
@login_required
@admin_required
def show_calendar(affiliation_id: str, schedule_of: str):
    if schedule_of and not isinstance(schedule_of, date):
        schedule_of = datetime.strptime(schedule_of, '%Y-%m').date()
    
    session = get_db_session()
    affiliation = AffiliationQuery(session).get_affiliation(affiliation_id)
    work_categories = SchedulerQuery(session).get_option_of_affiliation_id(affiliation_id).work_categories
    calendar = SchedulerQuery(session).get_calendar(affiliation_id, schedule_of.year, schedule_of.month)
    calendar = calendar or Calendar.new_month_year(
        affiliation, work_categories, schedule_of.year, schedule_of.month,
        [], 8)
    ids = [x['category'].id for x in calendar.categories]
    for work_category in work_categories:
        if work_category.id not in ids:
            calendar.add_category(work_category)
    operators = OperatorQuery(session).get_operators()
    
    form = SchedulerCalendarForm(obj=type('temp', (object,), {
        'schedule_of': schedule_of,
        'affiliation': affiliation
    }))
    
    return render_template('scheduler-calendar.html', form=form,
                           calendar=calendar, operators=operators)


@bp.route('/schedulers/affiliations/<affiliation_id>/basic-option')
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


@bp.route('/schedulers/affiliations/<affiliation_id>/basic-option', methods=['POST'])
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


@bp.route('/schedulers/affiliations/<affiliation_id>/basic-option/<option_id>', methods=['POST'])
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


@bp.route('/schedulers/affiliations/<affiliation_id>/yearly-option')
@login_required
@admin_required
def show_yearly_option(affiliation_id: str):
    session = get_db_session()
    affiliation = AffiliationQuery(session).get_affiliation(affiliation_id)
    return render_template('scheduler-yearly-option.html',
                           form=SchedulerYearlyOptionForm(obj=type('temp', (object,), {
                               'affiliation': affiliation
                           })))


@bp.route('/schedulers/affiliations/<affiliation_id>', methods=['POST'])
@login_required
@admin_required
def create_schedule(affiliation_id: str):
    pass
