# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import Response
from flask import request
from flask_login import login_required

import mypackages.utils.jsonize as jsonize

from workscheduler.applications.services import OperatorQuery
from workscheduler.applications.services import SkillQuery
from workscheduler.applications.web.util.functions.controller import admin_required
from workscheduler.applications.web import get_db_session
from ..adapters import OperatorCommandAdapter

bp = Blueprint('operators', __name__, template_folder="../views", static_folder="../statics")


@bp.route('/myself/<operator_id>')
@login_required
def show_myself(operator_id):
    operator = OperatorQuery(get_db_session()).get_operator(operator_id)
    skills = SkillQuery(get_db_session()).get_certified_skills()
    return render_template('operator.html', operator=operator, skills=skills)


@bp.route('/myself/<operator_id>', methods=['POST'])
@login_required
def update_myself(operator_id):
    session = get_db_session()
    try:
        OperatorCommandAdapter(session).update_myself(jsonize.loads(request.data))
        session.commit()

        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/')
@login_required
@admin_required
def show_operators():
    session = get_db_session()
    operators = OperatorQuery(session).get_operators()
    skills = SkillQuery(session).get_not_certified_skills()
    # to-do: to include ojt field which sometime be NoneType, fetch that field without meaning
    return render_template('operators.html', operators=[x if x.ojt else x for x in operators], skills=skills)


@bp.route('/<operator_id>', methods=['POST'])
@login_required
@admin_required
def update_operator(operator_id):
    session = get_db_session()
    try:
        req = OperatorCommandAdapter(session).update_operator(jsonize.loads(request.data))
        session.commit()

        session.refresh(req)
        # to-do: to include ojt field which sometime be NoneType, fetch that field without meaning
        response = Response(jsonize.dumps(req if req.ojt else req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response
