# -*- coding: utf-8 -*-

from flask import (
    Blueprint, render_template
)
from flask_login import login_required
from workscheduler.applications.services import SkillQuery
from .. import get_db_session


bp = Blueprint('skills', __name__)


@bp.route('/skills/show_skills')
@login_required
def show_skills():
    skill_repository = SkillQuery(get_db_session())
    return render_template('skills.html',
                           certified_skills=skill_repository.get_certified_skills(),
                           not_certified_skills=skill_repository.get_not_certified_skills())
