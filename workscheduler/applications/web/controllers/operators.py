# -*- coding: utf-8 -*-

from calendar import Calendar
from datetime import datetime
from functools import namedtuple
from flask import (
    Blueprint, request, redirect,
    url_for, render_template, flash
)
from flask_login import (
    login_required, current_user
)
from mypackages.domainevent import (
    Publisher, Subscriber, Event
)
from workscheduler.applications.services import (
    UserQuery, StoreUserSucceeded, StoreUserFailed
)
from .. import get_db_session
from ..adapters import UserCommandAdapter
from ..forms import UserForm


bp = Blueprint('operators', __name__)


@bp.route('/operators/my_request/<login_id>')
@login_required
def my_request(login_id):
    now = datetime.now()
    Day = namedtuple('Day', ('year', 'month', 'day', 'outer_month', 'current_day',
                             'notices', 'events'))
    weeks = [[Day(date.year, date.month, date.day,
                  date.year != now.year or date.month != now.month,
                  date.year == now.year and date.month == now.month and date.day == now.day,
                  None, None)
              for date in week]
             for week in Calendar().monthdatescalendar(now.year, now.month)]
    return render_template('requests.html', month_year="November 2018", weeks=weeks)


@bp.route('/operators/show_myself/<login_id>')
@login_required
def show_myself(login_id):
    return render_template('user.html')
