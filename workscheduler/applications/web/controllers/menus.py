# -*- coding: utf-8 -*-

from flask import Blueprint, request, session, redirect, url_for, render_template, flash

menus = Blueprint('menus', __name__)


@menus.route('/menu')
def show_menu():
    return render_template('menus.html')

