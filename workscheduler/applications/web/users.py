# -*- coding: utf-8 -*-

from flask import Blueprint, abort, request, session, redirect, url_for, render_template, flash
from domains.models.operator import Operator
from domains.domain_registry import DomainRegistry
from domains.services.authenticator import Authenticator
from workscheduler import login_manager
from flask_login import login_user, logout_user, login_required, current_user

users = Blueprint('users', __name__)
user_repository = DomainRegistry().user_repository


@login_manager.user_loader
def load_user(user_id):
    return user_repository.get_user(user_id)


@users.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = Authenticator(request.form['username'], request.form['password']).login()
        if not user:
            flash('Invalid username or password', 'error')
            return render_template('login.html')

        login_user(user)
        flash('You were logged in')
        return redirect(url_for('menus.show_menu'))
    return render_template('login.html')


@login_required
@users.route('/logout')
def logout():
    logout_user()
    flash('You were logged out')
    return redirect(url_for('users.login'))


@login_required
@users.route('/users')
def show_users():
    if current_user.role.is_admin:
        return render_template('users.html', users=user_repository.get_users(), roles=user_repository.get_roles())
    else:
        return render_template('user.html')


@login_required
@users.route('/add_user', methods=['POST'])
def add_user():
    if not request.form['login_id']:
        flash('login id is required', 'error')
        return redirect(url_for('users.show_users'))
    if not request.form['password']:
        flash('password is required', 'error')
        return redirect(url_for('users.show_users'))
    if not request.form['name']:
        flash('name is required', 'error')
        return redirect(url_for('users.show_users'))
    user_repository.append_user(request.form['login_id'], request.form['password'],
                                request.form['name'], request.form['role'])
    flash('New operator was successfully posted')
    return redirect(url_for('users.show_users'))


@login_required
@users.route('/user_options')
def show_user_options():
    roles = user_repository.get_roles()
    skills = user_repository.get_skills()
    return render_template('user_options.html', roles=roles, skills=skills)
