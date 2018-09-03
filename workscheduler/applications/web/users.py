# -*- coding: utf-8 -*-

from flask import Blueprint, abort, request, session, redirect, url_for, render_template, flash
from domains.models.operator import Operator
from domains.domain_register import DomainRegister
from domains.services.authenticator import Authenticator

users = Blueprint('users', __name__)
user_repository = DomainRegister().user_repository


@users.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = Authenticator(request.form['username'], request.form['password']).login()
        if not user:
            flash('Invalid username or password', 'error')
            return render_template('login.html')

        session['logged_in'] = True
        if user.is_admin():
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


@users.route('/operators')
def show_operators():
    return render_template('operators.html', users=user_repository.get_operators())


@users.route('/add_operator', methods=['POST'])
def add_operator():
    if not session.get('logged_in'):
        abort(401)
    if not request.form['username']:
        flash('name is required', 'error')
        return redirect(url_for('users.show_operators'))
    if not request.form['userrole']:
        flash('role is required', 'error')
        return redirect(url_for('users.show_operators'))
    user_repository.append_user(request.form['username'], request.form['userrole'])
    flash('New operator was successfully posted')
    return redirect(url_for('users.show_operators'))


@users.route('/operator_options')
def show_operator_options():
    ranks = user_repository.get_roles()
    skills = user_repository.get_skills()
    return render_template('operator_options.html', ranks=ranks, skills=skills)
