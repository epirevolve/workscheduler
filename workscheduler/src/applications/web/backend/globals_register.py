# -*- coding: utf-8 -*-

from datetime import date

from flask import session
from flask_login import current_user

from utils.date import to_year_month_string
from utils.date import get_next_month as get_next_month_
from utils.uuid import UuidFactory
from utils.jsonize import dumps

from applications.web.backend.services import OperatorQuery
from applications.web.backend import get_db_session


def generate_csrf_token():
    if 'csrf_token' not in session:
        session['csrf_token'] = UuidFactory().new_uuid()
    return session['csrf_token']


def get_next_month():
    return to_year_month_string(get_next_month_())


def get_current_month():
    return to_year_month_string(date.today())


def get_current_operator():
    operator_query = OperatorQuery(get_db_session())
    return operator_query.get_operator_of_user_id(current_user.id) if current_user.is_authenticated else ""


def globals_register(app):
    app.jinja_env.globals.update(to_json=dumps)

    app.jinja_env.globals['csrf_token'] = generate_csrf_token
    app.jinja_env.globals['today'] = date.today
    app.jinja_env.globals['next_month'] = get_next_month
    app.jinja_env.globals['current_month'] = get_current_month
    app.jinja_env.globals['current_operator'] = get_current_operator
