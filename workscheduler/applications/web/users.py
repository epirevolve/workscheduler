# -*- coding: utf-8 -*-

from flask import Blueprint, abort, request, session, redirect, url_for, render_template, flash
from domains.models.operator import Operator
from domains.domain_registry import DomainRegistry
from domains.services.authenticator import Authenticator

users = Blueprint('users', __name__)
user_repository = DomainRegistry().user_repository


@users.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = Authenticator(request.form['username'], request.form['password']).login()
        if not user:
            flash('Invalid username or password', 'error')
            return render_template('login.html')

        session['logged_in'] = True
        if user.role.is_admin:
            session['is_admin'] = True
        flash('You were logged in')
        return redirect(url_for('menus.show_menu'))
    return render_template('login.html')


@users.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('admin', None)
    flash('You were logged out')
    return redirect(url_for('users.login'))


@users.route('/users')
def show_users():
    return render_template('users.html', users=user_repository.get_users(), roles=user_repository.get_roles())


@users.route('/add_user', methods=['POST'])
def add_user():
    if not session.get('logged_in'):
        abort(401)
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


@users.route('/user_options')
def show_user_options():
    roles = user_repository.get_roles()
    skills = user_repository.get_skills()
    return render_template('user_options.html', roles=roles, skills=skills)
