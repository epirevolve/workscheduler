# -*- coding: utf-8 -*-

from flask import (
    Blueprint, request, render_template,
    Response
)
from flask_login import login_required
from workscheduler.applications.services import (
    TeamQuery, UserQuery
)
from workscheduler.applications.web import get_db_session
from workscheduler.applications.web.util.functions.controller import admin_required
from ..adapters import TeamCommandAdapter
from ..forms import TeamCategoryForm


bp = Blueprint('teams', __name__, template_folder='../views', static_folder='../statics')


@bp.route('/show_team_categories')
@login_required
@admin_required
def show_team_categories():
    team_repository = TeamQuery(get_db_session())
    return render_template('team-categories.html', team_categories=team_repository.get_team_categories())


@bp.route('/append_team_category')
@login_required
@admin_required
def show_append_page():
    return render_template('team-category-append.html')


@bp.route('/append_team_category/store', methods=['POST'])
@login_required
@admin_required
def store_team_category():
    response = Response()

    session = get_db_session()
    try:
        TeamCommandAdapter(session).append_team_category(TeamCategoryForm())
        session.commit()

        # session.query(TeamCategory).order_by(TeamCategory.id.desc()).first()
        response.status_code = 200
    except Exception as e:
        print(e)
        response.status_code = 400
        session.rollback()
    return response


@bp.route('/edit_team_category', methods=['POST'])
@login_required
@admin_required
def show_edit_page():
    session = get_db_session()
    team_repository = TeamQuery(session)
    user_repository = UserQuery(session)
    return render_template('team-category-edit.html', team_category=team_repository.get_team_category(request.form.get('team_category_id')), all_users=user_repository.get_users())
