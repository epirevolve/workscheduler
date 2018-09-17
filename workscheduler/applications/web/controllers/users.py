# -*- coding: utf-8 -*-

from flask import Blueprint, request, redirect, url_for, render_template, flash
from applications.services.authentication_service import AuthenticationService
from flask_login import login_user, logout_user, login_required
from applications.web import login_manager
from infrastructures.user_repository import UserRepository
from domains.models.user import UserFactory

users = Blueprint('users', __name__)
user_repository = None


@login_manager.user_loader
def load_user(user_id):
    return user_repository.get_user(user_id)


@users.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = AuthenticationService().login(request.form['username'], request.form['password'])
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
@users.route('/user')
def show_user():
    return render_template('user.html')


@login_required
@users.route('/users')
def show_users():
    return render_template('users.html', users=user_repository.get_users(), roles=user_repository.get_roles())


@login_required
@users.route('/store_user', methods=['POST'])
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
    user_repository.store_user(UserFactory.new_user(request.form['login_id'], request.form['password'],
                                                    request.form['name'], request.form['role']))
    flash('Operator was successfully posted')
    return redirect(url_for('users.show_users'))


@login_required
@users.route('/user_options')
def show_user_options():
    roles = user_repository.get_roles()
    skills = user_repository.get_skills()
    return render_template('user_options.html', roles=roles, skills=skills)
