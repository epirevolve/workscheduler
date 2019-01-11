# -*- coding: utf-8 -*-

from calendar import (
    Calendar, SUNDAY, day_abbr
)
from collections import namedtuple
from datetime import (
    datetime, date
)
from flask import (
    Blueprint, render_template, redirect,
    jsonify, request,url_for
)
from flask_login import login_required
from workscheduler.applications.services import (
    BelongQuery, ScheduleQuery, SkillQuery,
    OperatorQuery
)
from ..adapters import ScheduleCommandAdapter
from ..forms import SchedulerOptionForm
from .. import get_db_session
from . import admin_required


bp = Blueprint('schedules', __name__)


@bp.route('/schedules')
@login_required
def show_schedules():
    return render_template('schedules.html')


@bp.route('/schedules/scheduler_option/belongs/<belong_id>')
@login_required
@admin_required
def show_scheduler_option(belong_id: str):
    session = get_db_session()
    
    scheduler = ScheduleQuery(session).get_scheduler_of_belong_id(belong_id)
    method = 'POST' if not scheduler else 'PUT'
    
    belongs = BelongQuery(session).get_belongs_without_default()
    skill_query = SkillQuery(session)
    operator_query = OperatorQuery(session)
    
    return render_template('scheduler_option.html', method=method,
                           form=SchedulerOptionForm(obj=scheduler),
                           belongs=belongs, skills=skill_query.get_skills(),
                           operators=operator_query.get_operators())


@bp.route('/schedules/scheduler_option/belongs/<belong_id>', methods=['POST'])
@login_required
@admin_required
def append_scheduler_option(belong_id):
    session = get_db_session()
    response = jsonify()
    try:
        req = ScheduleCommandAdapter(session).append_scheduler(SchedulerOptionForm(request=request.form))
        session.commit()
    except Exception as e:
        session.rollback()
        print(e)
        response.status_code = 400
    return response


@bp.route('/schedules/scheduler_option/<scheduler_id>/belongs/<belong_id>', methods=['POST'])
@login_required
@admin_required
def update_scheduler_option(scheduler_id, belong_id):
    session = get_db_session()
    response = jsonify()
    try:
        req = ScheduleCommandAdapter(session).update_scheduler(SchedulerOptionForm(request=request.form))
        session.commit()
    except Exception as e:
        session.rollback()
        print(e)
        response.status_code = 400
    return response


@bp.route('/schedules/scheduler/belongs/<belong_id>/month_year/<month_year>')
@login_required
@admin_required
def show_scheduler(belong_id: str, month_year: str):
    if month_year and not isinstance(month_year, date):
        month_year = datetime.strptime(month_year, '%Y-%m').date()

    CalendarDay = namedtuple('CalendarDay', ('day', 'week_day'))

    calender = Calendar()

    def create_date(_date):
        return CalendarDay(_date.day, day_abbr[_date.weekday()])

    calender.setfirstweekday(SUNDAY)
    date_set = [create_date(_date) for week in calender.monthdatescalendar(month_year.year, month_year.month)
                for _date in week if _date.year == month_year.year and _date.month == month_year.month]
    
    session = get_db_session()
    belong_query = BelongQuery(session)
    operator_query = OperatorQuery(session)
    
    return render_template('scheduler.html', belong=belong_query.get_belong(belong_id), month_year=month_year,
                           date_set=date_set, operators=operator_query.get_operators())


@bp.route('/schedules/schedule/belongs/<belong_id>', methods=['POST'])
@login_required
@admin_required
def create_schedule(belong_id: str):
    pass
