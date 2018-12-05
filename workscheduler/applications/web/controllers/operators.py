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
from workscheduler.applications.services import OperatorQuery
from .. import get_db_session
from ..adapters import OperatorCommandAdapter
from ..forms import OperatorForm


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
    operator = OperatorQuery(get_db_session()).get_operator(current_user.id)
    return render_template('operator.html', form=OperatorForm(obj=operator))


@bp.route('/operators/update_myself', methods=['POST'])
@login_required
def update_myself():
    session = get_db_session()
    OperatorCommandAdapter(session).store_myself(OperatorForm())
    session.commit()

    flash('Operator info was successfully registered.')
    
    return redirect(url_for('operators.show_myself', login_id=current_user.login_id))
