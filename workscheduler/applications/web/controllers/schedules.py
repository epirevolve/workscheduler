# -*- coding: utf-8 -*-

from flask import (
    Blueprint, render_template
)
from flask_login import login_required
from .utils import admin_required


bp = Blueprint('schedules', __name__)


@bp.route('/schedules/show_schedules')
@login_required
def show_schedules():
    return render_template('schedules.html')


@bp.route('/schedules/show_scheduler', defaults={'team_id': ''})
@bp.route('/schedules/show_scheduler/<team_id>')
@login_required
@admin_required
def show_scheduler(team_id: str):
    return render_template('scheduler.html')


@bp.route('/schedules/create_schedule/<team_id>')
@login_required
@admin_required
def create_schedule(team_id: str):
    pass
