# -*- coding: utf-8 -*-

from flask import Blueprint, request, redirect, url_for, render_template, flash
from flask_login import login_required
from workscheduler.infrastructures.user_repository import UserRepository
from workscheduler.domains.models.user import UserFactory
from .. import get_db_session

bp = Blueprint('users', __name__)


@bp.route('/user/<login_id>')
@login_required
def show_user(login_id):
    return render_template('user.html')


@bp.route('/users')
@login_required
def show_users():
    user_repository = UserRepository(get_db_session())
    return render_template('users.html', users=user_repository.get_users(), roles=user_repository.get_roles())


@bp.route('/store_user', methods=['POST'])
@login_required
def store_user():
    if not request.form['login_id']:
        flash('login id is required', 'error')
        return redirect(url_for('users.show_users'))
    if not request.form['password']:
        flash('password is required', 'error')
        return redirect(url_for('users.show_users'))
    if not request.form['name']:
        flash('name is required', 'error')
        return redirect(url_for('users.show_users'))
    user_repository = UserRepository(get_db_session())
    user_repository.store_user(UserFactory.new_user(request.form['login_id'], request.form['password'],
                                                    request.form['name'], request.form['role']))
    flash('Operator was successfully posted')
    return redirect(url_for('users.show_users'))


@bp.route('/user_options')
@login_required
def show_user_options():
    user_repository = UserRepository(get_db_session())
    roles = user_repository.get_roles()
    skills = user_repository.get_skills()
    return render_template('user_options.html', roles=roles, skills=skills)
