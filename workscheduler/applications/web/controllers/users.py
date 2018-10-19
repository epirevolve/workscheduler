# -*- coding: utf-8 -*-

from flask import Blueprint, request, redirect, url_for, render_template, flash, Response
from flask_login import login_required
from workscheduler.applications.services.user_query import UserQuery
from .. import get_db_session

bp = Blueprint('users', __name__)


@bp.route('/users')
@login_required
def show_users():
    user_repository = UserQuery(get_db_session())
    return render_template('users.html', users=user_repository.get_users())


@bp.route('/store_user', methods=['POST'])
@login_required
def store_user():
    if not request.form.get('login_id'):
        flash('login id is required', 'error')
        return redirect(url_for('users.show_users'))
    if not request.form.get('name'):
        flash('name is required', 'error')
        return redirect(url_for('users.show_users'))
    session = get_db_session()
    from workscheduler.applications.services.user_managing_service import UserManagingService
    if not request.form.get('id'):
        UserManagingService(session).join_a_member(
            request.form.get('login_id'), 'p' + request.form.get('login_id'),
            request.form.get('name'), request.form.get('is_admin') == 'on',
            request.form.get('is_operator') == 'on')
    else:
        UserManagingService(session).renew_user(
            request.form.get('id'),
            request.form.get('login_id'),
            request.form.get('name'),
            request.form.get('is_admin') == 'on',
            request.form.get('is_operator') == 'on'
        )
    session.commit()
    flash('Operator was successfully registered.')
    flash('If you made new user, his/her password is p + his/her login id. Please change it.')
    return redirect(url_for('users.show_users'))


@bp.route('/reset_password/', methods=['POST'])
@login_required
def reset_password():
    response = Response()
    response.status_code = 304
    if not request.form.get('id'):
        return response
    session = get_db_session()
    user_repository = UserQuery(session)
    user = user_repository.get_user(request.form.get('id'))
    user.password = 'p' + user.login_id
    session.commit()
    response.status_code = 200
    return response
    

@bp.route('/operator_options')
@login_required
def show_operator_options():
    user_repository = UserQuery(get_db_session())
    skills = user_repository.get_skills()
    return render_template('user_options.html', skills=skills)
