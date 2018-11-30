# -*- coding: utf-8 -*-

from flask import (
    Blueprint, request, redirect,
    url_for, render_template, flash
)
from flask_login import (
    login_required, current_user
)
from workscheduler.applications.services import (
    UserQuery, StoreMyselfSucceeded, StoreMyselfFailed
)
from mypackages.domainevent import (
    Publisher, Subscriber, Event
)
from ..adapters import MyselfManageCommandAdapter
from ..forms import MyselfForm
from calendar import Calendar
from datetime import datetime
from functools import namedtuple
from .. import get_db_session


bp = Blueprint('myself', __name__)


@bp.route('/my_request/<login_id>')
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


@bp.route('/myself/<login_id>')
@login_required
def show_myself(login_id):
    return render_template('myself.html', form=MyselfForm(obj=current_user))


@bp.route('/store_myself', methods=['POST'])
@login_required
def store_myself():
    def store_myself_succeed_handler(_):
        flash('My info is successfully changed.')
        session.commit()
    
    def store_myself_fail_handler(event: Event):
        flash(event.event_message, 'error')
    
    Publisher.subscribe(Subscriber(store_myself_succeed_handler, StoreMyselfSucceeded, "store_myself_succeed"))
    Publisher.subscribe(Subscriber(store_myself_fail_handler, StoreMyselfFailed, "store_myself_fail"))
    
    session = get_db_session()
    MyselfManageCommandAdapter(session).store_myself(MyselfForm())

    Publisher.clear_subscribers("store_myself_succeed")
    Publisher.clear_subscribers("store_myself_fail")
    
    return redirect(url_for('myself.show_myself', login_id=current_user.login_id))
