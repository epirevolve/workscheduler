# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from flask_login import login_required

from utils import jsonize
from utils.string import to_date

from functions.controller import admin_required
from services import ScheduleFacade
from applications.backend import get_db_session

from ..adapters import ScheduleCommandAdapter

bp = Blueprint('schedule_api', __name__)


@bp.route('/schedules')
@login_required
def get_schedules():
    team_id = request.args.get('team-id')
    schedule_of = to_date(request.args.get('schedule-of'), '%Y-%m')
    day_settings, schedules = ScheduleFacade(get_db_session()).get_schedule(
        team_id, schedule_of.month, schedule_of.year)
    return jsonize.json_response(jsonize.dumps({'day_settings': day_settings, 'schedules': schedules}))


@bp.route('/schedules', methods=['PUT'])
@login_required
@admin_required
def update_schedules():
    session = get_db_session()
    try:
        ScheduleCommandAdapter(session).update_schedule(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/schedules/publish', methods=['PUT'])
@login_required
@admin_required
def publish_schedules():
    session = get_db_session()
    try:
        ScheduleCommandAdapter(session).publish_schedule(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/schedules/withdraw', methods=['PUT'])
@login_required
@admin_required
def withdraw_schedules():
    session = get_db_session()
    try:
        ScheduleCommandAdapter(session).withdraw_schedule(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response(status_code=400)
    return response
