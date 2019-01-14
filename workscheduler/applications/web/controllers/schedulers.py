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
    BelongQuery, SchedulerQuery, SkillQuery,
    OperatorQuery
)
from workscheduler.domains.models.scheduler import Calendar
from utils.date import get_next_month
from ..adapters import SchedulerCommandAdapter
from ..forms import (
    SchedulerOptionForm, SchedulerDateSettingForm
)
from .. import get_db_session
from . import admin_required


bp = Blueprint('schedulers', __name__)


@bp.route('/schedulers/belongs/<belong_id>/option')
@login_required
@admin_required
def show_scheduler_option(belong_id: str):
    session = get_db_session()
    
    option = SchedulerQuery(session).get_option_of_belong_id(belong_id)
    
    action = url_for('schedulers.append_scheduler_option', belong_id=belong_id) if not option\
        else url_for('schedulers.update_scheduler_option', option_id=option.id, belong_id=belong_id)
    url = url_for('schedulers.show_scheduler_option', belong_id="")

    belongs = BelongQuery(session).get_belongs_without_default()
    skills = SkillQuery(session).get_skills()
    operators = OperatorQuery(session).get_operators()
    
    return render_template('scheduler-option.html', action=action, url=url,
                           form=SchedulerOptionForm(obj=option), belong_id=belong_id,
                           belongs=belongs, skills=skills, operators=operators)


@bp.route('/schedulers/belongs/<belong_id>/option', methods=['POST'])
@login_required
@admin_required
def append_scheduler_option(belong_id):
    session = get_db_session()
    try:
        req = SchedulerCommandAdapter(session).append_option(SchedulerOptionForm(request=request.form))
        session.commit()
        response = jsonify({
            'redirect': url_for('schedulers.show_calendar',
                                belong_id=belong_id, schedule_of=get_next_month())
        })
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/schedulers/belongs/<belong_id>/option/<option_id>', methods=['POST'])
@login_required
@admin_required
def update_scheduler_option(option_id, belong_id):
    session = get_db_session()
    try:
        req = SchedulerCommandAdapter(session).update_option(SchedulerOptionForm(request=request.form))
        session.commit()
        response = jsonify({
            'redirect': url_for('schedulers.show_calendar',
                                belong_id=belong_id, schedule_of=get_next_month())
        })
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/schedulers/belongs/<belong_id>/scheduler-of/<schedule_of>')
@login_required
@admin_required
def show_calendar(belong_id: str, schedule_of: str):
    if schedule_of and not isinstance(schedule_of, date):
        schedule_of = datetime.strptime(schedule_of, '%Y-%m').date()

    session = get_db_session()
    belong = BelongQuery(session).get_belong(belong_id)
    work_categories = SchedulerQuery(session).get_option_of_belong_id(belong_id).work_categories
    calendar = SchedulerQuery(session).get_calendar(belong_id, schedule_of.year, schedule_of.month)
    calendar = calendar or Calendar.new_month_year(belong, work_categories, schedule_of.year, schedule_of.month, 8)
    operators = OperatorQuery(session).get_operators()
    
    form = SchedulerDateSettingForm(obj=type('temp', (object,), {
        'schedule_of': schedule_of,
        'belong': belong
    }))
    
    return render_template('scheduler-calendar.html', form=form,
                           calendar=calendar, operators=operators)


@bp.route('/schedulers/belongs/<belong_id>', methods=['POST'])
@login_required
@admin_required
def create_schedule(belong_id: str):
    pass
