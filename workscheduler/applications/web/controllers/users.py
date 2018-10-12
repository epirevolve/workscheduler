# -*- coding: utf-8 -*-

from flask import Blueprint, request, redirect, url_for, render_template, flash, Response
from flask_login import login_required, current_user
from workscheduler.infrastructures.user_repository import UserRepository
from workscheduler.domains.models.user import UserFactory
from .. import get_db_session

bp = Blueprint('users', __name__)


@bp.route('/myself/<login_id>')
@login_required
def show_myself(login_id):
    return render_template('myself.html')


@bp.route('/users')
@login_required
def show_users():
    user_repository = UserRepository(get_db_session())
    return render_template('users.html', users=user_repository.get_users())


@bp.route('/store_myself', methods=['POST'])
@login_required
def store_myself():
    if not request.form.get('id'):
        return
    user_repository = UserRepository(get_db_session())
    user = user_repository.get_user(current_user.id)
    user.password = request.form.get('password')
    user_repository.store_user(user)
    flash('Password is successfully changed.')
    return redirect(url_for('users.show_user', login_id=current_user.login_id))


@bp.route('/store_user', methods=['POST'])
@login_required
def store_user():
    if not request.form.get('login_id'):
        flash('login id is required', 'error')
        return redirect(url_for('users.show_users'))
    if not request.form.get('name'):
        flash('name is required', 'error')
        return redirect(url_for('users.show_users'))
    user_repository = UserRepository(get_db_session())
    if not request.form.get('id'):
        user = UserFactory.new_user(request.form.get('login_id'), 'p' + request.form.get('login_id'),
                                    request.form.get('name'), request.form.get('is_admin') == 'on',
                                    request.form.get('is_operator') == 'on')
    else:
        user = user_repository.get_user(request.form.get('id'))
        user.login_id = request.form.get('login_id')
        user.name = request.form.get('name')
        user.is_admin = request.form.get('is_admin') == 'on'
        user.is_operator = request.form.get('is_operator') == 'on'
    user_repository.store_user(user)
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
    user_repository = UserRepository(get_db_session())
    user = user_repository.get_user(request.form.get('id'))
    user.password = 'p' + user.login_id
    user_repository.store_user(user)
    response.status_code = 200
    return  response
    

@bp.route('/operator_options')
@login_required
def show_operator_options():
    user_repository = UserRepository(get_db_session())
    skills = user_repository.get_skills()
    return render_template('user_options.html', skills=skills)
