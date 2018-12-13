# -*- coding: utf-8 -*-

from calendar import (
    Calendar, SUNDAY
)
from datetime import (
    datetime, date
)
from functools import namedtuple
from flask import (
    Blueprint, redirect, url_for,
    render_template, flash, request,
    Response, jsonify
)
from flask_login import (
    login_required, current_user
)
from workscheduler.applications.services import OperatorQuery
from .. import get_db_session
from ..adapters import OperatorCommandAdapter
from ..forms import OperatorForm


bp = Blueprint('operators', __name__)


@bp.route('/operators/my_request/<login_id>', defaults={'month_year': date.today()})
@bp.route('/operators/my_request/<login_id>/<month_year>')
@login_required
def my_request(login_id, month_year):
    if month_year and not isinstance(month_year, date):
        month_year = datetime.strptime(month_year, '%Y-%m').date()
    today = date.today()
    CalendarDay = namedtuple('CalendarDay', ('date', 'outer_month',
                                             'current_day', 'notices', 'events'))
    
    def create_date(_date, notices, events):
        return CalendarDay(_date, _date.year != month_year.year or _date.month != month_year.month,
                           _date == today, notices, events)
    calender = Calendar()
    calender.setfirstweekday(SUNDAY)
    weeks = [[create_date(_date, None, None) for _date in week]
             for week in calender.monthdatescalendar(month_year.year, month_year.month)]
    return render_template('request.html', month_year=month_year, weeks=weeks)


@bp.route('/operators/append_my_request/<login_id>', methods=['POST'])
@login_required
def append_my_request(login_id):
    session = get_db_session()
    try:
        req = OperatorCommandAdapter(session).append_my_request(request.form)
        session.commit()

        response = jsonify({
            'evenId': req.id,
            'eventName': req.name,
            'eventAtFrom': req.at_from,
            'eventAtTo': req.at_to
        })
        response.status_code = 200
    except Exception as e:
        print(e)
        response = jsonify()
        response.status_code = 400
        session.rollback()
    return response


@bp.route('/operators/show_myself/<login_id>')
@login_required
def show_myself(login_id):
    operator = OperatorQuery(get_db_session()).get_operator(current_user.id)
    return render_template('operator.html', form=OperatorForm(obj=operator))


@bp.route('/operators/update_myself', methods=['POST'])
@login_required
def update_myself():
    session = get_db_session()
    OperatorCommandAdapter(session).update_myself(OperatorForm())
    session.commit()

    flash('Operator info was successfully registered.')
    
    return redirect(url_for('operators.show_myself', login_id=current_user.login_id))
