# -*- coding: utf-8 -*-

from flask import (
    Blueprint, render_template
)
from flask_login import (
    login_required
)
from workscheduler.applications.services import (
    UserQuery
)
from .. import get_db_session


bp = Blueprint('skills', __name__)


@bp.route('/show_skills')
@login_required
def show_skills():
    user_repository = UserQuery(get_db_session())
    skills = user_repository.get_skills()
    return render_template('skills.html', skills=skills)
