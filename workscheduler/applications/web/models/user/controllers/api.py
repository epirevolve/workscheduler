# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import Response
from flask_login import login_required

from utils import jsonize

from applications.services import AffiliationQuery
from applications.web import get_db_session

bp = Blueprint('users_api', __name__)


@bp.route('/affiliations')
@login_required
def get_affiliations():
    return Response(jsonize.dumps(AffiliationQuery(get_db_session()).get_affiliations_without_default()))
