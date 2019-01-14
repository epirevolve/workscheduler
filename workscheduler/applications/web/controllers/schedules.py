# -*- coding: utf-8 -*-

from flask import (
    Blueprint, render_template
)
from flask_login import login_required

bp = Blueprint('schedules', __name__)


@bp.route('/schedules')
@login_required
def show_schedules():
    return render_template('schedules.html')

