# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import Response
from flask import request
from flask_login import login_required

from utils import jsonize

from backend.services import OperatorQuery
from backend.functions.controller import admin_required
from applications.backend import get_db_session
from ..adapters import OperatorCommandAdapter


bp = Blueprint('operator_api', __name__)


@bp.route('/operators')
@login_required
def get_operators():
    operators = OperatorQuery(get_db_session()).get_operators()
    return jsonize.json_response(jsonize.dumps(operators))


@bp.route('/operators/myself/<operator_id>', methods=['PUT'])
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


@bp.route('/operators/<operator_id>', methods=['PUT'])
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


@bp.route('/skills', methods=['POST'])
@login_required
@admin_required
def append_skill():
    session = get_db_session()
    try:
        req = OperatorCommandAdapter(session).append_skill(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/skills/<skill_id>', methods=['PUT'])
@login_required
@admin_required
def update_skill(skill_id: str):
    session = get_db_session()
    try:
        req = OperatorCommandAdapter(session).update_skill(jsonize.loads(request.data))
        session.commit()
        session.refresh(req)
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response


@bp.route('/skills/<skill_id>', methods=['DELETE'])
@login_required
@admin_required
def remove_skill(skill_id: str):
    session = get_db_session()
    try:
        req = OperatorCommandAdapter(session).delete_skill(skill_id)
        session.commit()
        response = Response(jsonize.dumps(req))
    except Exception as e:
        session.rollback()
        print(e)
        response = Response()
        response.status_code = 400
    return response
