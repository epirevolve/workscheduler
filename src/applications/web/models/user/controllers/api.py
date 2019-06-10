# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import Response
from flask_login import login_required

from utils import jsonize

from applications.services import TeamQuery
from applications.web import get_db_session

bp = Blueprint('users_api', __name__)


@bp.route('/teams')
@login_required
def get_teams():
    return Response(jsonize.dumps(TeamQuery(get_db_session()).get_teams_without_default()))
