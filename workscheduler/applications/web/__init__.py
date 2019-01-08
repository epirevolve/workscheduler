# -*- coding: utf-8 -*-

from datetime import (
    date, timedelta
)
import os
import sys
import click
from flask import (
    Flask, g, current_app
)
from flask.cli import with_appcontext
from jinja2 import FileSystemLoader
from workscheduler.infrastructures import Database
from workscheduler.applications.services import BelongQuery


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
        SECRET_KEY='jlk32dasf4562erHUI378sdf',
        DATABASE=os.path.join(app.instance_path, 'workscheduler.db')
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

    # todo: need to refactor below configure setting

    # database action
    @click.command('init-db')
    @with_appcontext
    def init_db_command():
        Database(current_app.config['DATABASE']).init()
        click.echo('Initialized the database.')
    app.teardown_appcontext(close_db_session)
    app.cli.add_command(init_db_command)

    from .controllers import (
        auths, menus, schedules,
        operators, users, belongs,
        skills, teams
    )

    app.register_blueprint(auths.bp)
    app.register_blueprint(menus.bp)
    app.register_blueprint(schedules.bp)
    app.register_blueprint(operators.bp)
    app.register_blueprint(users.bp)
    app.register_blueprint(belongs.bp)
    app.register_blueprint(skills.bp)
    app.register_blueprint(teams.bp)

    @app.errorhandler(404)
    def not_found(error):
        from flask import render_template
        return render_template('not_found.html'), 404

    from flask_login import LoginManager
    
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'auths.index'

    from workscheduler.applications.services import UserQuery

    @login_manager.user_loader
    def load_user(user_id):
        return UserQuery(get_db_session()).get_user(user_id)
    
    from flask_wtf import CSRFProtect
    
    csrf = CSRFProtect()
    csrf.init_app(app)

    @app.before_first_request
    def extend_jinja_env():
        app.jinja_env.globals['today'] = date.today()

        def get_next_month():
            return (date.today().replace(day=1) + timedelta(days=32)).strftime('%Y-%m')

        app.jinja_env.globals['next_month'] = get_next_month()

        def get_default_belong():
            return BelongQuery(get_db_session()).get_default_belong()

        app.jinja_env.globals['default_belong_id'] = get_default_belong().id

    return app
