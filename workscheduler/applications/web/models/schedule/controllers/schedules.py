# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required
from flask_login import current_user

from workscheduler.applications.services import ScheduleFacade
from workscheduler.applications.web import get_db_session

bp = Blueprint('schedules', __name__, template_folder='../views', static_folder='../statics')


@bp.route('/')
@login_required
def show_schedules():
    next_month = request.args.get('next_month')
    if next_month and not isinstance(next_month, date):
        next_month = datetime.strptime(next_month, '%Y-%m').date()
    
    schedules = ScheduleFacade(get_db_session()).get_schedule(
        current_user.affiliation.id, next_month.year, next_month.month)
    return render_template('schedule.html')

