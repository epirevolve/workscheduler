# -*- coding: utf-8 -*-

from calendar import (
    Calendar, SUNDAY
)
from collections import namedtuple
from datetime import (
    datetime, date, timedelta,
)
from flask import (
    Blueprint, redirect, url_for,
    render_template, flash, request,
    jsonify
)
from flask_login import (
    login_required, current_user
)
from workscheduler.applications.services import (
    OperatorQuery, BelongQuery
)
from .. import get_db_session
from ..adapters import OperatorCommandAdapter
from ..forms import (
    OperatorForm, OperatorsForm
)
from . import admin_required


bp = Blueprint('operators', __name__)


@bp.route('/operators/my_request/<login_id>', defaults={'month_year': date.today().replace(day=1) + timedelta(days=32)})
@bp.route('/operators/my_request/<login_id>/<month_year>')
@login_required
def my_request(login_id, month_year):
    if month_year and not isinstance(month_year, date):
        month_year = datetime.strptime(month_year, '%Y-%m').date()

    session = get_db_session()
    operator = OperatorQuery(session).get_operator_of_user_id(current_user.id)
    
    CalendarDay = namedtuple('CalendarDay', ('date', 'outer_month',
                                             'notices', 'requests'))

    def is_between(date, start, end):
        return start.date() <= date <= end.date()

    def create_date(date, notices):
        return CalendarDay(date, date.year != month_year.year or date.month != month_year.month,
                           notices,
                           [request for request in operator.requests
                            if is_between(date, request.at_from, request.at_to)])
    calender = Calendar()
    calender.setfirstweekday(SUNDAY)
    weeks = [[create_date(_date, None) for _date in week]
             for week in calender.monthdatescalendar(month_year.year, month_year.month)]
    return render_template('request.html', month_year=month_year, weeks=weeks)


@bp.route('/operators/append_my_request', methods=['POST'])
@login_required
def append_my_request():
    session = get_db_session()
    try:
        req = OperatorCommandAdapter(session).append_my_request(request.form)
        session.commit()

        response = jsonify({
            'eventId': req.id,
            'eventTitle': req.title,
            'eventNone': req.note,
            'eventAtFrom': req.at_from,
            'eventAtTo': req.at_to
        })
        response.status_code = 200
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/operators/update_my_request')
@login_required
def update_my_request():
    pass


@bp.route('/operators/show_myself/<login_id>')
@login_required
def show_myself(login_id):
    operator = OperatorQuery(get_db_session()).get_operator_of_user_id(current_user.id)
    return render_template('operator.html', form=OperatorForm(obj=operator))


@bp.route('/operators/update_myself', methods=['POST'])
@login_required
def update_myself():
    session = get_db_session()
    OperatorCommandAdapter(session).update_myself(OperatorForm())
    session.commit()

    flash('Operator info was successfully registered.')
    
    return redirect(url_for('operators.show_myself', login_id=current_user.login_id))


@bp.route('/operators/show_operators')
@login_required
@admin_required
def show_operators():
    session = get_db_session()
    operators = OperatorQuery(session).get_operators()
    belongs = BelongQuery(session).get_belongs()
    
    return render_template('operators.html', form=OperatorsForm(),
                           operators=operators, belongs=belongs)


@bp.route('/operators/update_operator')
@login_required
@admin_required
def update_operator():
    pass
