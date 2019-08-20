# -*- coding: utf-8 -*-

import os

from flask import abort
from flask import Flask
from flask import g
from flask import current_app
from flask import request
from flask import session
from jinja2 import FileSystemLoader

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


config = {
    'prod': '.env',
    'debug': '.env.debug',
    'default': '.env'
}


def app_factory():
    app = Flask(__name__,
                instance_path=os.path.abspath(os.path.join(os.path.dirname(__file__), '../instance')),
                instance_relative_config=True,
                static_folder='../frontend/statics')
    views_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend/views'))
    app.jinja_loader = FileSystemLoader(os.path.join(os.path.dirname(__file__), views_path))
    config_name = os.getenv('FLASK_CONFIGURATION', 'default')
    app.config.from_pyfile(config[config_name])
    return app


def create_app(test_config=None):
    # create the application instance
    app = app_factory()

    if test_config is not None:
        app.config.update(test_config)

    from .logger_register import logger_register
    logger_register(app)

    app.teardown_appcontext(close_db_session)

    from .click_register import click_register
    click_register(app)

    from .bp_register import bp_register
    bp_register(app)

    @app.errorhandler(404)
    def not_found(error):
        from flask import render_template
        return render_template('not-found.html'), 404
    
    from applications.backend.controllers import user
    app.add_url_rule('/', 'index', user.index)

    from .login_manager_register import login_manager_register
    login_manager_register(app)

    from .globals_register import globals_register
    globals_register(app)

    @app.before_request
    def csrf_protect():
        if request.method in ["POST", "PUT", "DELETE"]:
            token = session.get('csrf_token', None)
            requests = [request.headers.environ.get('HTTP_X_CSRFTOKEN'), request.form.get('csrf_token')]
            if not token or token not in requests:
                abort(403)

    return app
