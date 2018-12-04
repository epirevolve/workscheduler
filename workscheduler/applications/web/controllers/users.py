# -*- coding: utf-8 -*-

from flask import (
    Blueprint, redirect,
    url_for, render_template, flash,
    Response
)
from flask_login import (
    login_required, current_user
)
from mypackages.domainevent import (
    Event, Subscriber, Publisher
)
from workscheduler.domains.models.user import (
    NewUserJoined, UserInfoUpdated
)
from workscheduler.applications.services import (
    UserQuery, StoreUserSucceeded, StoreUserFailed
)
from .. import get_db_session
from ..adapters import UserCommandAdapter
from ..forms import UserForm, UsersForm


bp = Blueprint('users', __name__)


@bp.route('/users/show_myself/<login_id>')
@login_required
def show_myself(login_id):
    return render_template('user.html', form=UserForm(obj=current_user))


@bp.route('/users/store_myself', methods=['POST'])
@login_required
def store_myself():
    def store_as_user_succeed_handler(_):
        flash('My info is successfully changed.')
        session.commit()
    
    def store_as_user_fail_handler(event: Event):
        flash(event.event_message, 'error')
    
    Publisher.subscribe(Subscriber(store_as_user_succeed_handler, StoreUserSucceeded, "store_user_succeed"))
    Publisher.subscribe(Subscriber(store_as_user_fail_handler, StoreUserFailed, "store_user_fail"))
    
    session = get_db_session()
    UserCommandAdapter(session).store_myself(UserForm())
    
    Publisher.clear_subscribers("store_user_succeed")
    Publisher.clear_subscribers("store_user_fail")
    
    return redirect(url_for('users.show_myself', login_id=current_user.login_id))


@bp.route('/users/show_users')
@login_required
def show_users():
    user_repository = UserQuery(get_db_session())
    return render_template('users.html', form=UsersForm(), users=user_repository.get_users())


@bp.route('/users/store_user', methods=['POST'])
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
    
    session = get_db_session()
    UserCommandAdapter(session).store_user(UsersForm())
    
    Publisher.clear_subscribers("store_user_succeed")
    Publisher.clear_subscribers("store_user_fail")

    return redirect(url_for('users.show_users'))


@bp.route('/users/reset_password', methods=['POST'])
@login_required
def reset_password():
    response = Response()
    response.status_code = 400
    
    def reset_password_succeed_handler(_, response):
        response.status_code = 200
        session.commit()

    Publisher.subscribe(Subscriber(lambda x: reset_password_succeed_handler(x, response), UserInfoUpdated, "reset_password_succeed"))

    session = get_db_session()
    UserCommandAdapter(session).reset_password(UsersForm())

    Publisher.clear_subscribers("reset_password_succeed")

    return response
