# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import request
from flask import Response
from flask_login import login_required

import mypackages.utils.jsonize as jsonize

from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.web import get_db_session
from workscheduler.applications.web.util.functions.controller import admin_required
from ..adapters import AffiliationCommandAdapter
from ..adapters import AffiliationFacadeAdapter


bp = Blueprint('affiliations', __name__, template_folder='../views', static_folder="../statics")


@bp.route('/')
@login_required
@admin_required
def show_affiliations():
    affiliation_repository = AffiliationQuery(get_db_session())
    affiliations = affiliation_repository.get_affiliations()
    return render_template('affiliations.html', affiliations=affiliations)


@bp.route('/', methods=['POST'])
@login_required
@admin_required
def append_affiliation():
    session = get_db_session()
    try:
        req = AffiliationFacadeAdapter(session).append_affiliation(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/<affiliation_id>', methods=['POST'])
@login_required
@admin_required
def update_affiliation(affiliation_id: str):
    session = get_db_session()
    try:
        req = AffiliationCommandAdapter(session).update_affiliation(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/<affiliation_id>', methods=['POST'])
@login_required
@admin_required
def remove_affiliation(affiliation_id: str):
    session = get_db_session()
    try:
        AffiliationCommandAdapter(session).remove_affiliation(affiliation_id)
        session.commit()
        response = Response()
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response
