# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from flask import Response
from flask_login import login_required

from utils import jsonize

from applications.errors import AlreadyLaunchError
from applications.web.util.functions.controller import admin_required
from applications.web import get_db_session
from ..adapters import SchedulerCommandAdapter


bp = Blueprint('schedulers_api', __name__)


@bp.route('/monthly-settings', methods=['PUT'])
@login_required
@admin_required
def update_monthly_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_monthly_setting(jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/monthly-settings/public', methods=['PUT'])
@login_required
@admin_required
def public_monthly_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).public_monthly_setting(jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/basic-setting', methods=['PUT'])
@login_required
@admin_required
def update_basic_setting():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_basic_setting(jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/yearly-setting', methods=['PUT'])
@login_required
@admin_required
def update_yearly_setting():
    scheduler_id = request.args.get('scheduler_id')
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).update_yearly_setting(scheduler_id, jsonize.loads(request.data))
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/launch-scheduler', methods=['POST'])
@login_required
@admin_required
def launch_scheduler():
    session = get_db_session()
    try:
        SchedulerCommandAdapter(session).launch(jsonize.loads(request.data))
        response = Response()
    except AlreadyLaunchError as e:
        print(e)
        response = Response('already launched this affiliation scheduler. please wait util its completion.')
        response.status_code = 400
    except Exception as e:
        print(e)
        response = Response()
        response.status_code = 400
    return response
