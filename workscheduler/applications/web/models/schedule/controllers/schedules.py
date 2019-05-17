# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask import request
from flask_login import login_required
from flask_login import current_user

from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.web import get_db_session

bp = Blueprint('schedules', __name__, template_folder='../views', static_folder='../statics')


def show_schedules_operator():
    return render_template('schedule-operator.html', affiliation=current_user.affiliation)


def show_schedules_administrator():
    affiliations = AffiliationQuery(get_db_session()).get_affiliations_without_default()
    affiliation_id = request.args.get('affiliation_id')
    if affiliation_id:
        affiliation = list(filter(lambda x: x.id == affiliation_id, affiliations))[0]
    else:
        affiliation = affiliations[0]
    return render_template('schedule-admin.html', affiliations=affiliations, affiliation=affiliation)


@bp.route('/')
@login_required
def show_schedules():
    if current_user.is_operator:
        return show_schedules_operator()
    else:
        return show_schedules_administrator()
