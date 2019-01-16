# -*- coding: utf-8 -*-

from datetime import (
    datetime, date
)
from flask import (
    Blueprint, render_template, jsonify,
    request, url_for
)
from flask_login import login_required
from workscheduler.applications.services import (
    AffiliationQuery, SchedulerQuery, SkillQuery,
    OperatorQuery
)
from workscheduler.domains.models.scheduler import Calendar
from mypackages.utils.date import (
    get_next_month, to_year_month_string
)
from ..adapters import SchedulerCommandAdapter
from ..forms import (
    SchedulerOptionForm, SchedulerCalendarForm
)
from .. import get_db_session
from . import admin_required


bp = Blueprint('schedulers', __name__)


@bp.route('/schedulers/affiliations/<affiliation_id>/option')
@login_required
@admin_required
def show_scheduler_option(affiliation_id: str):
    session = get_db_session()
    
    option = SchedulerQuery(session).get_option_of_affiliation_id(affiliation_id)
    
    action = url_for('schedulers.append_scheduler_option', affiliation_id=affiliation_id) if not option\
        else url_for('schedulers.update_scheduler_option', option_id=option.id, affiliation_id=affiliation_id)
    url = url_for('schedulers.show_scheduler_option', affiliation_id="")

    affiliations = AffiliationQuery(session).get_affiliations_without_default()
    skills = SkillQuery(session).get_skills()
    operators = OperatorQuery(session).get_operators()
    
    return render_template('scheduler-option.html', action=action, url=url,
                           form=SchedulerOptionForm(obj=option), affiliation_id=affiliation_id,
                           affiliations=affiliations, skills=skills, operators=operators)


@bp.route('/schedulers/affiliations/<affiliation_id>/option', methods=['POST'])
@login_required
@admin_required
def append_scheduler_option(affiliation_id):
    session = get_db_session()
    try:
        req = SchedulerCommandAdapter(session).append_option(SchedulerOptionForm(request=request.form))
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


@bp.route('/schedulers/affiliations/<affiliation_id>/option/<option_id>', methods=['POST'])
@login_required
@admin_required
def update_scheduler_option(option_id, affiliation_id):
    session = get_db_session()
    try:
        req = SchedulerCommandAdapter(session).update_option(SchedulerOptionForm(request=request.form))
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
    operators = OperatorQuery(session).get_operators()
    
    form = SchedulerCalendarForm(obj=type('temp', (object,), {
        'schedule_of': schedule_of,
        'affiliation': affiliation
    }))
    
    return render_template('scheduler-calendar.html', form=form,
                           calendar=calendar, operators=operators)


@bp.route('/schedulers/affiliations/<affiliation_id>', methods=['POST'])
@login_required
@admin_required
def create_schedule(affiliation_id: str):
    pass
