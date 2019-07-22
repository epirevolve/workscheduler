# -*- coding: utf-8 -*-

from flask import Blueprint
from flask_login import login_required

from utils import jsonize

from utils.uuid import UuidFactory


bp = Blueprint('util_api', __name__)


@bp.route('/uuid')
@login_required
def get_uuid():
    uuid = UuidFactory.new_uuid()
    return jsonize.json_response(jsonize.dumps(uuid))
