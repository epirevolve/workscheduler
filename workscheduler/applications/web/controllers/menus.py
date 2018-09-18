# -*- coding: utf-8 -*-

from flask import Blueprint, render_template

bp = Blueprint('menus', __name__)


@bp.route('/menu')
def show_menu():
    return render_template('menus.html')
