# -*- coding: utf-8 -*-

from flask import (
    Blueprint, request, redirect,
    url_for, render_template, flash
)
from flask_login import (
    login_required, current_user
)
from workscheduler.applications.services import UserQuery
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
    days = [[Day(date.year, date.month, date.day,
                 date.year != now.year or date.month != now.month,
                 date.year == now.year and date.month == now.month and date.day == now.day,
                 None, None)
             for date in week]
            for week in Calendar().monthdatescalendar(now.year, now.month)]
    return render_template('requests.html', month_year="November 2018", weeks=days)


@bp.route('/myself/<login_id>')
@login_required
def show_myself(login_id):
    session = get_db_session()
    user_repository = UserQuery(session)
    # test data
    return render_template('myself.html', skills=user_repository.get_skills())


@bp.route('/store_myself', methods=['POST'])
@login_required
def store_myself():
    session = get_db_session()
    user_repository = UserQuery(session)
    user = user_repository.get_user(current_user.id)
    user.password = request.form.get('password')
    user.skills.clear()
    for skill in user_repository.get_skills():
        if request.form.get(skill.id) == 'on':
            user.skills.append(skill)
    session.commit()
    flash('My info is successfully changed.')
    return redirect(url_for('myself.show_myself', login_id=current_user.login_id))
