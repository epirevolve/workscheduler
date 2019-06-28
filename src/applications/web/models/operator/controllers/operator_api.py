# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import Response
from flask import request
from flask_login import login_required

from utils import jsonize

from applications.web.util.functions.controller import admin_required
from applications.web import get_db_session
from ..adapters import OperatorCommandAdapter

bp = Blueprint('operator_api', __name__)


@bp.route('/myself/<operator_id>', methods=['PUT'])
@login_required
def update_myself(operator_id):
    session = get_db_session()
    try:
        OperatorCommandAdapter(session).update_myself(jsonize.loads(request.data))
        session.commit()
        response = jsonize.json_response()
    except Exception as e:
        session.rollback()
        print(e)
        response = jsonize.json_response()
        response.status_code = 400
    return response


@bp.route('/<operator_id>', methods=['PUT'])
@login_required
@admin_required
def update_operator(operator_id):
    session = get_db_session()
    try:
        req = OperatorCommandAdapter(session).update_operator(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        # to-do: to include ojt field which sometime be NoneType, fetch that field without meaning
        response = Response(jsonize.dumps(req if req.ojt else req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response
