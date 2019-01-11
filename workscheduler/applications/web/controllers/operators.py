# -*- coding: utf-8 -*-

from calendar import (
    Calendar, SUNDAY
)
from collections import namedtuple
from datetime import (
    datetime, date
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


@bp.route('/operators/my-request/operators/<operator_id>/month_year/<month_year>')
@login_required
def show_my_request(operator_id, month_year):
    if month_year and not isinstance(month_year, date):
        month_year = datetime.strptime(month_year, '%Y-%m').date()

    session = get_db_session()
    operator = OperatorQuery(session).get_operator_of_user_id(current_user.id)
    
    CalendarDay = namedtuple('CalendarDay', ('date', 'outer_month',
                                             'notices', 'requests'))

    def is_between(_date, start, end):
        return start.date() <= _date <= end.date()

    def create_date(_date, notices):
        return CalendarDay(_date, _date.year != month_year.year or _date.month != month_year.month,
                           notices,
                           [_request for _request in operator.requests
                            if is_between(_date, _request.at_from, _request.at_to)])
    calender = Calendar()
    calender.setfirstweekday(SUNDAY)
    weeks = [[create_date(_date, None) for _date in week]
             for week in calender.monthdatescalendar(month_year.year, month_year.month)]
    return render_template('request.html', month_year=month_year, weeks=weeks)


@bp.route('/operators/my-request', methods=['POST'])
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


@bp.route('/operators/my-request/<requst_id>', methods=['POST'])
@login_required
def update_my_request(requst_id):
    pass


@bp.route('/operators/myself/<operator_id>')
@login_required
def show_myself(operator_id):
    operator = OperatorQuery(get_db_session()).get_operator_of_user_id(current_user.id)
    return render_template('operator.html', form=OperatorForm(obj=operator))


@bp.route('/operators/myself/<operator_id>', methods=['POST'])
@login_required
def update_myself(operator_id):
    session = get_db_session()
    OperatorCommandAdapter(session).update_myself(OperatorForm())
    session.commit()

    flash('Operator info was successfully registered.')
    
    return redirect(url_for('operators.show_myself', operator_id=operator_id))


@bp.route('/operators')
@login_required
@admin_required
def show_operators():
    session = get_db_session()
    operators = OperatorQuery(session).get_operators()
    belongs = BelongQuery(session).get_belongs()
    
    return render_template('operators.html', form=OperatorsForm(),
                           operators=operators, belongs=belongs)


@bp.route('/operators/<operator_id>', methods=['POST'])
@login_required
@admin_required
def update_operator():
    pass
