# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required
from flask_login import current_user

from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.services import ScheduleFacade
from workscheduler.applications.web import get_db_session

from mypackages.utils.date import to_year_month_string

bp = Blueprint('schedules', __name__, template_folder='../views', static_folder='../statics')


def show_schedules_not_found(schedule_of, affiliation):
    return render_template('schedule-not-found.html', schedule_of=schedule_of, affiliation=affiliation)


def show_schedules_operator(schedule_of: date):
    schedules = ScheduleFacade(get_db_session()).get_schedule(
        current_user.affiliation.id, schedule_of.year, schedule_of.month)
    if not schedules:
        return show_schedules_not_found(schedule_of, current_user.affiliation)
    
    my_schedule = list(filter(lambda x: x['operator'].user.id == current_user.id, schedules))[0]
    others_schedule = list(filter(lambda x: x['operator'].user.id != current_user.id, schedules))
    return render_template('schedule-operator.html', my_schedule=my_schedule, others_schedule=others_schedule,
                           schedule_of=to_year_month_string(schedule_of))


def show_schedules_administrator(schedule_of: date):
    affiliation = AffiliationQuery(get_db_session()).get_affiliation(request.args.get('affiliation_id'))
    schedules = ScheduleFacade(get_db_session()).get_schedule(
        affiliation.id, schedule_of.year, schedule_of.month)
    if not schedules:
        return show_schedules_not_found(schedule_of, affiliation)
    
    return render_template('schedule-admin.html', schedule_of=to_year_month_string(schedule_of))


@bp.route('/')
@login_required
def show_schedules():
    schedule_of = request.args.get('schedule_of')
    if schedule_of and not isinstance(schedule_of, date):
        schedule_of = datetime.strptime(schedule_of, '%Y-%m').date()
    
    if current_user.is_operator:
        return show_schedules_operator(schedule_of)
    else:
        return show_schedules_administrator(schedule_of)
