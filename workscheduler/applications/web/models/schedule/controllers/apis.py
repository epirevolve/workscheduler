# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date

from flask import Blueprint
from flask import request
from flask import Response
from flask_login import login_required

from mypackages.utils import jsonize

from workscheduler.applications.services import ScheduleFacade
from workscheduler.applications.services import SchedulerQuery
from workscheduler.applications.web import get_db_session

bp = Blueprint('schedules_apis', __name__)


@bp.route('/scheduler')
@login_required
def get_scheduler():
    affiliation_id = request.args.get('affiliation-id')
    scheduler = SchedulerQuery(get_db_session()).get_scheduler_of_affiliation_id(affiliation_id)
    return Response(jsonize.dumps(scheduler))


@bp.route('/monthly-setting')
@login_required
def get_monthly_setting():
    affiliation_id = request.args.get('affiliation-id')
    schedule_of = request.args.get('schedule-of')
    if schedule_of and not isinstance(schedule_of, date):
        schedule_of = datetime.strptime(schedule_of, '%Y-%m').date()
    scheduler = SchedulerQuery(get_db_session()).get_scheduler_of_affiliation_id(affiliation_id)
    monthly_setting = scheduler.monthly_setting(schedule_of.month, schedule_of.year)
    return Response(jsonize.dumps(monthly_setting))


@bp.route('/schedules')
@login_required
def get_schedules():
    affiliation_id = request.args.get('affiliation-id')
    schedule_of = request.args.get('schedule-of')
    if schedule_of and not isinstance(schedule_of, date):
        schedule_of = datetime.strptime(schedule_of, '%Y-%m').date()
    day_settings, schedules, totals, is_published = ScheduleFacade(get_db_session()).get_schedule(
        affiliation_id, schedule_of.month, schedule_of.year)
    return Response(jsonize.dumps({'day_settings': day_settings, 'schedules': schedules,
                                   'totals': totals, 'is_published': is_published}))
