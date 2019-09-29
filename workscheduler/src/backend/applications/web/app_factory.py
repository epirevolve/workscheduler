# -*- coding: utf-8 -*-

import os

from flask import abort
from flask import request
from flask import session
from flask import Flask
from jinja2 import FileSystemLoader

config = {
    'prod': '.env',
    'debug': '.env.debug',
    'default': '.env'
}


def _relate_path_to_abspath(path):
    return os.path.abspath(os.path.join(os.path.dirname(__file__), path))


def create_app(test_config=None):
    app = Flask(__name__,
                instance_path=_relate_path_to_abspath('../instance'),
                instance_relative_config=True)
    app.static_folder = _relate_path_to_abspath('../../../frontend/web/statics')
    app.jinja_loader = FileSystemLoader(_relate_path_to_abspath('../../../frontend/web/views'))

    config_name = os.getenv('FLASK_CONFIGURATION', 'default')
    app.config.from_pyfile(config[config_name])

    if test_config is not None:
        app.config.update(test_config)

    from .logger_register import logger_register
    logger_register(app)

    from .database import close_db_session
    app.teardown_appcontext(close_db_session)

    from .click_register import click_register
    click_register(app)

    from .bp_register import bp_register
    bp_register(app)

    @app.errorhandler(404)
    def not_found(error):
        from flask import render_template
        return render_template('not-found.html'), 404

    from applications.web.controllers import user
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
