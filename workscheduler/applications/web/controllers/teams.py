# -*- coding: utf-8 -*-

from flask import (
    Blueprint, jsonify, request, render_template,
    Response
)
from flask_login import login_required
from mypackages.utils.uuid import UuidFactory
from workscheduler.applications.services import (
    TeamQuery, UserQuery
)
from .. import get_db_session
from ..adapters import TeamCommandAdapter
from ..forms import TeamCategoryForm
from . import admin_required


bp = Blueprint('teams', __name__)


@bp.route('/teams/show_team_categories')
@login_required
@admin_required
def show_team_categories():
    team_repository = TeamQuery(get_db_session())
    return render_template('team_categories.html', team_categories=team_repository.get_team_categories())


@bp.route('/teams/append_team_category')
@login_required
@admin_required
def show_append_page():
    return render_template('team_category_append.html')


@bp.route('/teams/append_team_category/store', methods=['POST'])
@login_required
@admin_required
def store_team_category():
    session = get_db_session()
    try:
        team_category_id = UuidFactory.new_uuid()
        TeamCommandAdapter(session).append_team_category(team_category_id, TeamCategoryForm())
        session.commit()

        response = jsonify({
            'teamCategoryId': team_category_id
        })
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response


@bp.route('/teams/edit_team_category', methods=['POST'])
@login_required
@admin_required
def show_edit_page():
    session = get_db_session()
    team_repository = TeamQuery(session)
    user_repository = UserQuery(session)
    return render_template('team_category_edit.html', team_category=team_repository.get_team_category(request.form.get('team_category_id')), all_users=user_repository.get_users())


@bp.route('/teams/edit_team_category/update', methods=['POST'])
@login_required
@admin_required
def update_team_category():
    response = Response()

    session = get_db_session()
    try:
        TeamCommandAdapter(session).update_team_category(request.json['teamCategoryInfo'], request.json['teamInfo'])
        session.commit()

        response.status_code = 200
    except Exception as e:
        session.rollback()
        print(e)
        response.status_code = 400
    return response
