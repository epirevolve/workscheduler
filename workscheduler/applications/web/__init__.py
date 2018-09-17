# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask
from jinja2 import FileSystemLoader


def create_app(test_config=None):
    # create the application instance
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'statics'))
    app.jinja_loader = FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates'))
    app.config.from_object(__name__)

    app.config.from_mapping(
        SECRET_KEY='key secreted',
        DATABASE='sqlite:///{}'.format(os.path.join(app.instance_path, 'workscheduler.db'))
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.update(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.config.from_envvar('WORK_SCHEDULER_SETTING', silent=True)

    sys.path.append(os.path.dirname(__file__))

    from flask_login import LoginManager

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'users.login'

    from applications.web.controllers.menus import menus
    from applications.web.controllers.schedules import schedules
    from applications.web.controllers.users import users

    app.register_blueprint(menus)
    app.register_blueprint(schedules)
    app.register_blueprint(users)

    from infrastructures.db_connection import SessionContextFactory
    sc_factory = SessionContextFactory(app.config['DATABASE'])

    @app.cli.command('initdb')
    def initdb():
        from infrastructures.db_connection import DbConnection
        """Initializes the database."""
        with sc_factory.create() as session:
            DbConnection().init_db(session)
        print('Initialized the database.')

    return app
