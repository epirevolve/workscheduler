# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask_login import login_required

from applications.services import OperatorQuery
from applications.services import SkillQuery
from applications.web.util.functions.controller import admin_required
from applications.web import get_db_session

bp = Blueprint('operator', __name__, template_folder="../views", static_folder="../statics")


@bp.route('/myself/<operator_id>')
@login_required
def show_myself(operator_id):
    operator = OperatorQuery(get_db_session()).get_operator(operator_id)
    skills = SkillQuery(get_db_session()).get_certified_skills()
    return render_template('operator.html', operator=operator, skills=skills)


@bp.route('/')
@login_required
@admin_required
def show_operators():
    session = get_db_session()
    operators = OperatorQuery(session).get_operators()
    skills = SkillQuery(session).get_not_certified_skills()
    # to-do: to include ojt field which sometime be NoneType, fetch that field without meaning
    return render_template('operators.html', operators=[x if x.ojt else x for x in operators], skills=skills)


@bp.route('/')
@login_required
@admin_required
def show_skills():
    skill_query = SkillQuery(get_db_session())
    return render_template('skills.html', skills=skill_query.get_skills())
