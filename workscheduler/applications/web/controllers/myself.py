# -*- coding: utf-8 -*-

from flask import Blueprint, request, redirect, url_for, render_template, flash
from flask_login import login_required, current_user
from workscheduler.applications.services.user_query import UserQuery
from .. import get_db_session


bp = Blueprint('myself', __name__)


@bp.route('/my_request/<login_id>')
@login_required
def my_request(login_id):
    pass


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
    flash('Password is successfully changed.')
    return redirect(url_for('myself.show_myself', login_id=current_user.login_id))
