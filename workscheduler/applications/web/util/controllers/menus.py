# -*- coding: utf-8 -*-

from flask import (
    Blueprint, render_template
)
from flask_login import login_required

bp = Blueprint('menus', __name__)


@bp.route('/')
@login_required
def show_menu():
    return render_template('menus.html', static_folder="../statics")
