# -*- coding: utf-8 -*-

import os
from datetime import date

from dotenv import load_dotenv
from flask import abort
from flask import Flask
from flask import g
from flask import current_app
from flask import request
from flask import session
from flask_login import LoginManager
from flask_login import current_user
from jinja2 import FileSystemLoader

from utils.date import to_year_month_string
from utils.date import get_next_month as get_next_month_
from utils.jsonize import dumps
from utils.uuid import UuidFactory

from applications.backend.services import OperatorQuery
from infrastructures import Database


def get_db_session(echo=False):
    if 'db_session' not in g:
        g.db_session = Database(current_app.config['DATABASE'], echo).create_session()
    return g.db_session


def close_db_session(e=None):
    db_session = g.pop('db_session', None)
    if db_session:
        db_session.commit()
        db_session.close()


def create_app(test_config=None):
    # create the application instance
    app = Flask(__name__, static_folder='../frontend/statics')
    app.jinja_loader = FileSystemLoader(os.path.join(os.path.dirname(__file__), '../frontend/views'))
    app.config.from_object(__name__)

    if os.environ.get('PYTHON_DEBUG') and os.path.exists('.env.test'):
        load_dotenv('.env.test')
    elif os.path.exists('.env'):
        load_dotenv('.env')

    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY'),
        DATABASE=os.environ.get('DATABASE')
    )

    if test_config is not None:
        app.config.update(test_config)

    app.config.from_envvar('WORK_SCHEDULER_SETTING', silent=True)
    app.teardown_appcontext(close_db_session)

    from .click_register import click_register
    click_register(app)

    from .bp_register import bp_register
    bp_register(app)

    @app.errorhandler(404)
    def not_found(error):
        from flask import render_template
        return render_template('not-found.html'), 404
    
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'user.index'

    from applications.backend.controllers import user
    app.add_url_rule('/', 'index', user.index)

    from applications.backend.services import UserQuery
    @login_manager.user_loader
    def load_user(user_id):
        return UserQuery(get_db_session()).get_user(user_id)

    app.jinja_env.globals.update(to_json=dumps)

    @app.before_request
    def csrf_protect():
        if request.method in ["POST", "PUT", "DELETE"]:
            token = session.get('csrf_token', None)
            requests = [request.headers.environ.get('HTTP_X_CSRFTOKEN'), request.form.get('csrf_token')]
            if not token or token not in requests:
                abort(403)

    def generate_csrf_token():
        if 'csrf_token' not in session:
            session['csrf_token'] = UuidFactory().new_uuid()
        return session['csrf_token']

    def get_next_month():
        return to_year_month_string(get_next_month_())
    
    def get_current_month():
        return to_year_month_string(date.today())
    
    def get_operator_id():
        operator_query = OperatorQuery(get_db_session())
        return operator_query.get_operator_of_user_id(current_user.id).id if current_user.is_authenticated else ""
    
    app.jinja_env.globals['csrf_token'] = generate_csrf_token
    app.jinja_env.globals['today'] = date.today
    app.jinja_env.globals['next_month'] = get_next_month
    app.jinja_env.globals['current_month'] = get_current_month
    app.jinja_env.globals['operator_id'] = get_operator_id
    
    return app
