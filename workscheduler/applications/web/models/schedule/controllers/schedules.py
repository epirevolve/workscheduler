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
from workscheduler.applications.services import SchedulerQuery
from workscheduler.applications.web import get_db_session

from mypackages.utils.date import to_year_month_string

bp = Blueprint('schedules', __name__, template_folder='../views', static_folder='../statics')


def show_schedules_not_found(schedule_of, affiliation):
    return render_template('schedule-not-found.html', schedule_of=to_year_month_string(schedule_of),
                           affiliation=affiliation)


def show_schedules_operator(schedule_of: date):
    session = get_db_session()
    monthly_setting = SchedulerQuery(session).get_scheduler_of_affiliation_id(
        current_user.affiliation.id).monthly_setting(schedule_of.month, schedule_of.year)
    schedules, totals = ScheduleFacade(session).get_schedule(
        current_user.affiliation.id, schedule_of.month, schedule_of.year)
    if not schedules:
        return show_schedules_not_found(schedule_of, current_user.affiliation)
    
    my_schedule = list(filter(lambda x: x['operator'].user == current_user, schedules))[0]
    others_schedule = list(filter(lambda x: x['operator'].user != current_user, schedules))
    return render_template('schedule-operator.html', my_schedule=my_schedule, others_schedule=others_schedule,
                           schedule_of=to_year_month_string(schedule_of), monthly_setting=monthly_setting)


def show_schedules_administrator(schedule_of: date):
    affiliations = AffiliationQuery(get_db_session()).get_affiliations_without_default()
    affiliation_id = request.args.get('affiliation_id')
    if affiliation_id:
        affiliation = list(filter(lambda x: x.id == affiliation_id, affiliations))[0]
    else:
        affiliation = affiliations[0]
    session = get_db_session()
    monthly_setting = SchedulerQuery(session).get_scheduler_of_affiliation_id(
        affiliation.id).monthly_setting(schedule_of.month, schedule_of.year)
    schedules, totals = ScheduleFacade(session).get_schedule(
        affiliation.id, schedule_of.month, schedule_of.year)
    if not schedules:
        return show_schedules_not_found(schedule_of, affiliation)
    
    return render_template('schedule-admin.html', schedules=schedules, totals=totals,
                           affiliations=affiliations, affiliation=affiliation,
                           schedule_of=to_year_month_string(schedule_of), monthly_setting=monthly_setting)


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
