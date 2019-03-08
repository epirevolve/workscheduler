# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date

from flask import Blueprint
from flask import render_template
from flask import request
from flask import jsonify
from flask import Response
from flask_login import login_required
from flask_login import current_user

import mypackages.utils.jsonize as jsonize

from workscheduler.applications.errors import CalendarError
from workscheduler.applications.errors import RequestError
from workscheduler.applications.services import SchedulerQuery
from workscheduler.applications.services import OperatorQuery
from workscheduler.applications.web import get_db_session
from ..adapters import RequestCommandAdapter

bp = Blueprint('requests', __name__, template_folder='../views', static_folder='../statics')


def _public_request_body(scheduler, monthly_setting):
    operator = OperatorQuery(get_db_session()).get_operator_of_user_id(current_user.id)
    return render_template('request-public.html',
                           operator=operator, schedule_of=monthly_setting.schedule_of,
                           scheduler=scheduler, monthly_setting=monthly_setting)


def _non_public_request_body(schedule_of):
    return render_template('request-non-public.html', schedule_of=schedule_of)


@bp.route('/')
@login_required
def show_my_request():
    calendar = request.args.get('calendar')
    
    if calendar and not isinstance(calendar, date):
        calendar = datetime.strptime(calendar, '%Y-%m').date()
    
    session = get_db_session()
    scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(current_user.affiliation.id)
    if not scheduler:
        return _non_public_request_body(calendar)
    
    monthly_setting = scheduler.month_year_setting(calendar.month, calendar.year)
    
    return _public_request_body(scheduler, monthly_setting) \
        if monthly_setting and monthly_setting.is_published and not monthly_setting.is_fixed \
        else _non_public_request_body(calendar)


@bp.route('/', methods=['POST'])
@login_required
def append_my_request():
    scheduler_id = request.args.get('scheduler')
    
    session = get_db_session()
    try:
        req = RequestCommandAdapter(session).append_my_request(
            scheduler_id, jsonize.loads(request.data))
        session.commit()
        
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except CalendarError as e:
        session.rollback()
        print(e)
        response = jsonify({
            'errorMessage': 'not allowed month is included in you request.'
        })
        response.status_code = 400
    except RequestError as e:
        session.rollback()
        print(e)
        response = jsonify({
            'errorMessage': 'some requests are overlapping.'
        })
        response.status_code = 400
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/<request_id>', methods=['POST'])
@login_required
def update_my_request(request_id):
    scheduler_id = request.args.get('scheduler')
    
    session = get_db_session()
    try:
        req = RequestCommandAdapter(session).update_my_request(
            scheduler_id, jsonize.loads(request.data))
        session.commit()
        
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/<request_id>', methods=['DELETE'])
@login_required
def remove_my_request(request_id):
    session = get_db_session()
    try:
        req = RequestCommandAdapter(session).remove_my_request(request_id)
        session.commit()
        
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response