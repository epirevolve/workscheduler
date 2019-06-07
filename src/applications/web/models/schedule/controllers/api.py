# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from flask import Response
from flask_login import login_required

from utils import jsonize
from utils.string import to_date

from applications.web.util.functions.controller import admin_required
from applications.services import ScheduleFacade
from applications.services import SchedulerQuery
from applications.web import get_db_session
from ..adapters import ScheduleCommandAdapter

bp = Blueprint('schedules_api', __name__)


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
    schedule_of = to_date(request.args.get('schedule-of'), '%Y-%m')
    scheduler = SchedulerQuery(get_db_session()).get_scheduler_of_affiliation_id(affiliation_id)
    monthly_setting = scheduler.monthly_setting(schedule_of.month, schedule_of.year)
    return Response(jsonize.dumps(monthly_setting))


@bp.route('/schedules')
@login_required
def get_schedules():
    affiliation_id = request.args.get('affiliation-id')
    schedule_of = to_date(request.args.get('schedule-of'), '%Y-%m')
    day_settings, schedules, totals, is_published = ScheduleFacade(get_db_session()).get_schedule(
        affiliation_id, schedule_of.month, schedule_of.year)
    return Response(jsonize.dumps({'day_settings': day_settings, 'schedules': schedules,
                                   'totals': totals, 'is_published': is_published}))


@bp.route('/schedules', methods=['PUT'])
@login_required
@admin_required
def update_schedules():
    session = get_db_session()
    try:
        ScheduleCommandAdapter(session).update_schedule(jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response
