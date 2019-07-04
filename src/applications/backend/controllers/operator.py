# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask_login import login_required

from services import OperatorQuery
from functions.controller import admin_required
from applications.backend import get_db_session

bp = Blueprint('operator', __name__, template_folder='../../frontend/views', static_folder="../../frontend/statics")


@bp.route('/myself/<operator_id>')
@login_required
def show_myself(operator_id):
    query = OperatorQuery(get_db_session())
    operator = query.get_operator(operator_id)
    skills = query.get_certified_skills()
    return render_template('operator.html', operator=operator, skills=skills)


@bp.route('/')
@login_required
@admin_required
def show_operators():
    query = OperatorQuery(get_db_session())
    operators = query.get_operators()
    skills = query.get_not_certified_skills()
    return render_template('operators.html', operators=[x if x.ojt else x for x in operators], skills=skills)


@bp.route('/')
@login_required
@admin_required
def show_skills():
    query = OperatorQuery(get_db_session())
    return render_template('skills.html', skills=query.get_skills())
