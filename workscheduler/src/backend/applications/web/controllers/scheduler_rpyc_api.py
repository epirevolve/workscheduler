# -*- coding: utf-8 -*-

import traceback

from time import strftime
from time import localtime

from flask import Blueprint
from flask import request
from flask import current_app
from flask_login import login_required

from utils import jsonize

from applications.errors import AlreadyLaunchError
from applications.web.functions.controller import admin_required
from applications.web.adapters import SchedulerRPyCAdapter

bp = Blueprint('scheduler_rpyc_api', __name__)


@bp.route('/launch-scheduler', methods=['POST'])
@login_required
@admin_required
def launch_scheduler():
    try:
        current_app.logger.info("#### start time: {}".format(strftime("%a, %d %b %Y %H:%M:%S", localtime())))
        SchedulerRPyCAdapter().launch(
            current_app.config['DATABASE'],
            current_app.config['RPYCSERVER'],
            jsonize.loads(request.data))
        current_app.logger.info("#### fin time: {}".format(strftime("%a, %d %b %Y %H:%M:%S", localtime())))
        response = jsonize.json_response()
    except AlreadyLaunchError as e:
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(
            'already launched this team scheduler. please wait util its completion.', status_code=400)
    except Exception as e:
        current_app.logger.error(traceback.format_exc())
        response = jsonize.json_response(status_code=400)
    return response
