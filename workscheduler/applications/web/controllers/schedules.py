# -*- coding: utf-8 -*-

from flask import (
    Blueprint, request, session,
    g, redirect, url_for, abort,
    render_template, flash
)
from flask_login import login_required
from . import admin_required


bp = Blueprint('schedules', __name__)


@bp.route('/schedules/show_schedules')
@login_required
def show_schedules():
    return render_template('schedules.html')


@bp.route('/schedules/show_scheduler')
@login_required
@admin_required
def show_scheduler():
    pass
