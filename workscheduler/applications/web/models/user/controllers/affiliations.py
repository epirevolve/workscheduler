# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import request
from flask import jsonify
from flask_login import login_required

from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.web import get_db_session
from workscheduler.applications.web.util.functions.controller import admin_required
from ..adapters import AffiliationCommandAdapter


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
        affiliation = AffiliationCommandAdapter(session).append_affiliation(request.form)
        session.commit()
        
        response = jsonify({
            'affiliationId': affiliation.id,
            'affiliationName': affiliation.name,
            'affiliationNote': affiliation.note
        })
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response
