# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import request
from flask import render_template
from flask import Response
from flask_login import login_required

import mypackages.utils.jsonize as jsonize

from workscheduler.applications.services import SkillQuery
from workscheduler.applications.web import get_db_session
from workscheduler.applications.web.util.functions.controller import admin_required
from ..adapters import SkillCommandAdapter


bp = Blueprint('skills', __name__, template_folder="../views", static_folder="../statics")


@bp.route('/')
@login_required
@admin_required
def show_skills():
    skill_query = SkillQuery(get_db_session())
    return render_template('skills.html', skills=skill_query.get_skills())


@bp.route('/', methods=['POST'])
@login_required
@admin_required
def append_skill():
    session = get_db_session()
    try:
        req = SkillCommandAdapter(session).append_skill(jsonize.loads(request.data))
        session.commit()
        
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/<skill_id>', methods=['POST'])
@login_required
@admin_required
def update_skill(skill_id: str):
    session = get_db_session()
    try:
        req = SkillCommandAdapter(session).update_skill(jsonize.loads(request.data))
        session.commit()
        
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/<skill_id>', methods=['DELETE'])
@login_required
@admin_required
def remove_skill(skill_id: str):
    session = get_db_session()
    try:
        req = SkillCommandAdapter(session).delete_skill(skill_id)
        session.commit()
        
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response
