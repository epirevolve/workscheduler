# -*- coding: utf-8 -*-

from flask import Blueprint, request, redirect, url_for, render_template, flash, Response
from flask_login import login_required
from mylibraries.domainevent import Event, Subscriber, Publisher
from workscheduler.applications.services.user_query import UserQuery
from .. import get_db_session
from workscheduler.applications.services.user_managing_service import UserManagingService, \
    StoreUserSucceeded, StoreUserFailed
from workscheduler.domains.models.user.user import NewUserJoined, UserInfoUpdated, InvalidUserOperated


bp = Blueprint('users', __name__)


@bp.route('/users')
@login_required
def show_users():
    user_repository = UserQuery(get_db_session())
    return render_template('users.html', users=user_repository.get_users())


@bp.route('/store_user', methods=['POST'])
@login_required
def store_user():
    def store_user_succeed_handler(_):
        flash('User was successfully registered.')
        flash('If you made new user, his/her password is p + his/her login id. Please change it.')
        session.commit()

    def store_user_fail_handler(event: Event):
        flash(event.event_message, 'error')
    
    Publisher.subscribe(Subscriber(store_user_succeed_handler, StoreUserSucceeded, "store_user_succeed"))
    Publisher.subscribe(Subscriber(store_user_fail_handler, StoreUserFailed, "store_user_fail"))
    Publisher.subscribe(Subscriber(store_user_fail_handler, InvalidUserOperated, "invalid_user_operated"))
    
    session = get_db_session()
    UserManagingService(session).store_user(
        request.form.get('id'),
        request.form.get('login_id'),
        request.form.get('name'),
        request.form.get('is_admin'),
        request.form.get('is_operator'))
    
    Publisher.clear_subscribers("store_user_succeed")
    Publisher.clear_subscribers("store_user_fail")
    Publisher.clear_subscribers("invalid_user_operated")

    return redirect(url_for('users.show_users'))


@bp.route('/reset_password', methods=['POST'])
@login_required
def reset_password():
    response = Response()
    response.status_code = 400
    
    def reset_password_succeed_handler(_, response):
        response.status_code = 200
        session.commit()

    Publisher.subscribe(Subscriber(lambda x: reset_password_succeed_handler(x, response), UserInfoUpdated, "reset_password_succeed"))

    session = get_db_session()
    UserManagingService(session).reset_password(
        request.form.get('id'))

    Publisher.clear_subscribers("reset_password_succeed")

    return response
