# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask_login import login_required

from applications.services import SkillQuery
from applications.web import get_db_session
from applications.web.util.functions.controller import admin_required


bp = Blueprint('skills', __name__, template_folder="../views", static_folder="../statics")


@bp.route('/')
@login_required
@admin_required
def show_skills():
    skill_query = SkillQuery(get_db_session())
    return render_template('skills.html', skills=skill_query.get_skills())
