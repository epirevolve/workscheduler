# -*- coding: utf-8 -*-

from flask import Blueprint, request, redirect, url_for, render_template, flash, Response
from flask_login import login_required, current_user
from workscheduler.infrastructures.user_query import UserRepository
from .. import get_db_session


bp = Blueprint('myself', __name__)


@bp.route('/myself/<login_id>')
@login_required
def show_myself(login_id):
    return render_template('myself.html')


@bp.route('/store_password', methods=['POST'])
@login_required
def store_password():
    session = get_db_session()
    user_repository = UserRepository(session)
    user = user_repository.get_user(current_user.id)
    user.password = request.form.get('password')
    session.commit()
    flash('Password is successfully changed.')
    return redirect(url_for('myself.show_myself', login_id=current_user.login_id))
