# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask
from jinja2 import FileSystemLoader
import click
from flask import g, current_app
from flask.cli import with_appcontext
from workscheduler.infrastructures.database import Database


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
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'statics'))
    app.jinja_loader = FileSystemLoader(os.path.join(os.path.dirname(__file__), 'views'))
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

    # database action
    @click.command('init-db')
    @with_appcontext
    def init_db_command():
        Database(current_app.config['DATABASE']).init()
        click.echo('Initialized the database.')
    app.teardown_appcontext(close_db_session)
    app.cli.add_command(init_db_command)

    from .controllers import auths, menus, schedules, myself, users

    app.register_blueprint(auths.bp)
    app.register_blueprint(menus.bp)
    app.register_blueprint(schedules.bp)
    app.register_blueprint(myself.bp)
    app.register_blueprint(users.bp)

    @app.errorhandler(404)
    def not_found(error):
        from flask import render_template
        return render_template('not_found.html'), 404

    from flask_login import LoginManager
    
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auths.index'
    
    @login_manager.user_loader
    def load_user(user_id):
        return auths.load_user(user_id)
    
    return app
