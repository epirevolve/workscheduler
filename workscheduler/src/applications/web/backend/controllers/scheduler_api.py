# -*- coding: utf-8 -*-

import traceback

from flask import Blueprint
from flask import request
from flask import current_app
from flask_login import login_required

from utils import jsonize
from utils.string import to_date

from applications.web.backend.errors import CalendarError
from applications.web.backend.errors import RequestError
from applications.web.backend.services import SchedulerQuery
from applications.web.backend.adapters import SchedulerCommandAdapter
from applications.web.backend.functions.controller import admin_required
from applications.web.backend.database import get_db_session
from domains.models.scheduler import all_available_sign


bp = Blueprint('scheduler_api', __name__)


@bp.route('/scheduler')
@login_required
def get_scheduler():
    team_id = request.args.get('team-id')
    scheduler = SchedulerQuery(get_db_session()).get_scheduler_of_team_id(team_id)
    return jsonize.json_response(jsonize.dumps(scheduler))


@bp.route('/scheduler', methods=['PUT'])
@login_required
def update_scheduler():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).save_scheduler(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/work-categories')
@login_required
def get_work_categories():
    team_id = request.args.get('team-id')
    scheduler = SchedulerQuery(get_db_session()).get_scheduler_of_team_id(team_id)
    work_categories = scheduler.work_categories
    return jsonize.json_response(jsonize.dumps(work_categories))


@bp.route('/available-signs')
@login_required
def get_available_signs():
    return jsonize.json_response(jsonize.dumps(all_available_sign))


@bp.route('/monthly-setting')
@login_required
def get_monthly_setting():
    team_id = request.args.get('team-id')
    schedule_of = to_date(request.args.get('schedule-of'), '%Y-%m')
    scheduler = SchedulerQuery(get_db_session()).get_scheduler_of_team_id(team_id)
    monthly_setting = scheduler.monthly_setting(month=schedule_of.month, year=schedule_of.year)
    return jsonize.json_response(jsonize.dumps(monthly_setting))


@bp.route('/monthly-settings', methods=['PUT'])
@login_required
def update_monthly_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).save_monthly_setting(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/monthly-settings/public', methods=['PUT'])
@login_required
@admin_required
def public_monthly_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).public_monthly_setting(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/basic-setting', methods=['PUT'])
@login_required
@admin_required
def update_basic_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).save_basic_setting(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/vacations')
@login_required
def get_vacations():
    team_id = request.args.get('team-id')
    scheduler = SchedulerQuery(get_db_session()).get_scheduler_of_team_id(team_id)
    schedule_of = to_date(request.args.get('schedule-of'), '%Y-%m')

    def is_in_period(on_from, on_to):
        return (on_from.year == schedule_of.year and on_from.month <= schedule_of.month
                or on_from.year < schedule_of.year)\
                and (on_to.year == schedule_of.year and on_to.month >= schedule_of.month
                     or schedule_of.year < on_to.year)
    vacations = list(filter(lambda x: is_in_period(x.on_from, x.on_to), scheduler.vacations))
    return jsonize.json_response(jsonize.dumps(vacations))


@bp.route('/vacations', methods=['POST'])
@login_required
@admin_required
def append_vacation():
    session = get_db_session()
    try:
        req = SchedulerCommandAdapter(session).append_vacation(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = jsonize.json_response(jsonize.dumps(req))
    except:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/vacations', methods=['PUT'])
@login_required
@admin_required
def update_vacation():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_vacation(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/current-runners')
@login_required
@admin_required
def get_current_runners():
    current_runners = SchedulerQuery(get_db_session()).get_current_runners()
    return jsonize.json_response(jsonize.dumps(current_runners))


@bp.route('/launch-histories')
@login_required
@admin_required
def get_launch_histories():
    histories = SchedulerQuery(get_db_session()).get_launch_histories()
    return jsonize.json_response(jsonize.dumps(histories))


@bp.route('/terminate-scheduler', methods=['PUT'])
@login_required
@admin_required
def terminate_scheduler():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).terminate(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response


@bp.route('/requests/<request_id>', methods=['DELETE'])
@login_required
def remove_request(request_id):
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).remove_request(request_id)
        session.commit()
        response = jsonize.json_response()
    except:
        session.rollback()
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response
