# -*- coding: utf-8 -*-

from calendar import (
    Calendar as SysCalendar, SUNDAY
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

from mypackages.utils.date import is_between
from workscheduler.applications.errors import CalendarError
from workscheduler.applications.services import (
    OperatorQuery, AffiliationQuery, SchedulerQuery
)
from . import admin_required
from .. import get_db_session
from ..adapters import OperatorCommandAdapter
from ..forms import (
    OperatorForm, OperatorsForm
)

bp = Blueprint('operators', __name__)


def _public_request_body(month_year: date, scheduler_calendar):
    operator = OperatorQuery(get_db_session()).get_operator_of_user_id(current_user.id)
    CalendarDay = namedtuple('CalendarDay', ('date', 'outer_month',
                                             'notices', 'requests'))

    def is_display(date, request):
        return is_between(date, request.at_from.date(), request.at_to.date())\
               and (request.at_from.month == date.month - 1 and date.day == 1 or date == request.at_from.date())

    def create_date(date, notices):
        is_outer_month = date.year != month_year.year or date.month != month_year.month
        return CalendarDay(date, is_outer_month, notices,
                           [] if is_outer_month else [r for r in operator.requests if is_display(date, r)])
    
    sys_calender = SysCalendar()
    sys_calender.setfirstweekday(SUNDAY)
    weeks = [[create_date(y, None) for y in x]
             for x in sys_calender.monthdatescalendar(month_year.year, month_year.month)]
    return render_template('request-public.html',
                           month_year=month_year, weeks=weeks, paid_holidays=operator.remain_paid_holiday,
                           scheduler_calendar=scheduler_calendar)


def _non_public_request_body(month_year):
    return render_template('request-non-public.html', month_year=month_year)


@bp.route('/operators/my-requests/month-year/<month_year>')
@login_required
def show_my_request(month_year):
    if month_year and not isinstance(month_year, date):
        month_year = datetime.strptime(month_year, '%Y-%m').date()

    session = get_db_session()
    scheduler_calendar = SchedulerQuery(session).get_calendar(current_user.affiliation.id,
                                                              month_year.year, month_year.month)
    return _public_request_body(month_year, scheduler_calendar) if scheduler_calendar\
        else _non_public_request_body(month_year)


@bp.route('/operators/my-requests', methods=['POST'])
@login_required
def append_my_request():
    session = get_db_session()
    try:
        req = OperatorCommandAdapter(session).append_my_request(request.form)
        session.commit()

        response = jsonify({
            'requestId': req.id,
            'requestTitle': req.title,
            'requestNone': req.note,
            'requestAtFrom': req.at_from,
            'requestAtTo': req.at_to
        })
        response.status_code = 200
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    except CalendarError as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/operators/my-requests/<requst_id>', methods=['POST'])
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
    affiliations = AffiliationQuery(session).get_affiliations()
    
    return render_template('operators.html', form=OperatorsForm(),
                           operators=operators, affiliations=affiliations)


@bp.route('/operators/<operator_id>', methods=['POST'])
@login_required
@admin_required
def update_operator(operator_id):
    pass
