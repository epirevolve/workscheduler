# -*- coding: utf-8 -*-

from flask import Blueprint, request, session, g, redirect, url_for, abort, render_template, flash


schedules = Blueprint('schedules', __name__)


@schedules.route('/schedules')
def show_schedules():
    return render_template('schedules.html')

