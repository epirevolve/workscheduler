# -*- coding: utf-8 -*-

from flask import (
    Blueprint, render_template, request,
    jsonify
)
from flask_login import login_required
from workscheduler.applications.services import SkillQuery
from workscheduler.applications.web import get_db_session
from workscheduler.applications.web.util.functions.controller import admin_required
from ..adapters import SkillCommandAdapter


bp = Blueprint('skills', __name__, template_folder="../views", static_folder="../statics")


@bp.route('/')
@login_required
@admin_required
def show_skills():
    skill_repository = SkillQuery(get_db_session())
    return render_template('skills.html',
                           certified_skills=skill_repository.get_certified_skills(),
                           not_certified_skills=skill_repository.get_not_certified_skills())


def _append_skill(adapter_function):
    session = get_db_session()
    try:
        req = adapter_function(SkillCommandAdapter(session))(request.form)
        session.commit()

        response = jsonify({
            'skillId': req.id,
            'skillName': req.name,
            'skillScore': req.score,
            'skillIsCertified': req.is_certified
        })
        response.status_code = 200
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/certified_skill', methods=['POST'])
@login_required
@admin_required
def append_certified_skill():
    return _append_skill(lambda x: lambda y: x.append_certified_skill(y))


@bp.route('/not_certified_skill', methods=['POST'])
@login_required
@admin_required
def append_not_certified_skill():
    return _append_skill(lambda x: lambda y: x.append_not_certified_skill(y))
