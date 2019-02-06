# -*- coding: utf-8 -*-

from flask import Blueprint
from flask import render_template
from flask_login import login_required

bp = Blueprint('schedules', __name__, template_folder='../views', static_folder='../statics')


@bp.route('/')
@login_required
def show_schedules():
    return render_template('schedules.html')

