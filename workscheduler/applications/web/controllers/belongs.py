# -*- coding: utf-8 -*-

from flask import (
    Blueprint, render_template, request,
    flash, jsonify
)
from flask_login import login_required
from workscheduler.applications.services import BelongQuery
from workscheduler.applications.web.adapters import BelongCommandAdapter
from .. import get_db_session


bp = Blueprint('belongs', __name__)


@bp.route('/belongs/show_belongs')
@login_required
def show_belongs():
    belong_repository = BelongQuery(get_db_session())
    belongs = belong_repository.get_belongs()
    return render_template('belongs.html', belongs=belongs)


@bp.route('/belongs/append_belong', methods=['POST'])
@login_required
def append_belong():
    session = get_db_session()
    try:
        belong = BelongCommandAdapter(session).append_belong(request.form)
        session.commit()
        
        response = jsonify({
            'belongId': belong.id,
            'belongName': belong.name,
            'belongNote': belong.note
        })
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonify()
        response.status_code = 400
    return response
