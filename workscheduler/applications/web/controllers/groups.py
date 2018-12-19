# -*- coding: utf-8 -*-

from flask import (
    Blueprint, render_template
)
from flask_login import login_required
from workscheduler.applications.services import (
    OperatorQuery
)
from .. import get_db_session


bp = Blueprint('groups', __name__)


@bp.route('/groups/show_groups')
@login_required
def show_groups():
    operator_repository = OperatorQuery(get_db_session())
    skills = operator_repository.get_skills()
    return render_template('skills.html', skills=skills)

