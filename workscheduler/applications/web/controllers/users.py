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
from workscheduler.applications.services import UserQuery
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
    session = get_db_session()
    UserCommandAdapter(session).store_myself(UserForm())
    session.commit()
    
    flash('My info is successfully changed.')
    
    return redirect(url_for('users.show_myself', login_id=current_user.login_id))


@bp.route('/users/show_users')
@login_required
def show_users():
    user_repository = UserQuery(get_db_session())
    return render_template('users.html', form=UsersForm(), users=user_repository.get_users())


@bp.route('/users/append_user', methods=['POST'])
@login_required
def append_user():
    session = get_db_session()
    UserCommandAdapter(session).append_user(UsersForm())
    session.commit()

    flash('User was successfully registered.')
    flash('His/her password is p + his/her login id. Please change it.')
    
    return redirect(url_for('users.show_users'))


@bp.route('/users/update_user', methods=['POST'])
@login_required
def update_user():
    session = get_db_session()
    UserCommandAdapter(session).update_user(UsersForm())
    session.commit()

    flash('User was successfully registered.')
    
    return redirect(url_for('users.show_users'))


@bp.route('/users/reset_password', methods=['POST'])
@login_required
def reset_password():
    response = Response()

    session = get_db_session()
    try:
        UserCommandAdapter(session).reset_password(UsersForm())
        session.commit()
    
        response.status_code = 200
    except:
        response.status_code = 400
        session.rollback()
    return response
