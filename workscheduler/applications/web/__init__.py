# -*- coding: utf-8 -*-

import os
import sys
from datetime import date

import click
from flask import Flask
from flask import g
from flask import current_app
from flask.cli import with_appcontext
from flask_login import LoginManager
from flask_login import current_user
from jinja2 import FileSystemLoader

from mypackages.utils.date import to_year_month_string
from mypackages.utils.date import get_next_month
from mypackages.utils.jsonize import dumps

from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.services import OperatorQuery
from workscheduler.infrastructures import Database


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
    app = Flask(__name__, static_folder='util/statics')
    app.jinja_loader = FileSystemLoader(os.path.join(os.path.dirname(__file__), 'util/views'))
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
    app.teardown_appcontext(close_db_session)

    # cli action
    @click.command('init-db')
    @with_appcontext
    def init_db_command():
        Database(current_app.config['DATABASE']).init()
        click.echo('Initialized the database.')
    app.cli.add_command(init_db_command)
    
    @click.command('set-test-db')
    @with_appcontext
    def set_test_db_command():
        Database(current_app.config['DATABASE']).set_test()
        click.echo('Set the database to test.')
    app.cli.add_command(set_test_db_command)

    from .util.controllers import menus_bp
    from .models.user.controllers import auth_bp
    from .models.user.controllers import affiliations_bp
    from .models.user.controllers import users_bp
    from .models.operator.controllers import operators_bp
    from .models.operator.controllers import skills_bp
    from .models.operator.controllers import teams_bp
    from .models.scheduler.controllers import request_bp
    from .models.scheduler.controllers import schedulers_bp
    from .models.schedule.controllers import schedules_bp

    app.register_blueprint(menus_bp, url_prefix="/menus")
    app.register_blueprint(auth_bp)
    app.register_blueprint(affiliations_bp, url_prefix="/affiliations")
    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(operators_bp, url_prefix="/operators")
    app.register_blueprint(skills_bp, url_prefix="/skills")
    app.register_blueprint(teams_bp, url_prefix="/teams")
    app.register_blueprint(request_bp, url_prefix="/requests")
    app.register_blueprint(schedulers_bp, url_prefix="/schedulers")
    app.register_blueprint(schedules_bp, url_prefix="/schedules")

    @app.errorhandler(404)
    def not_found(error):
        from flask import render_template
        return render_template('not-found.html'), 404
    
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

    app.jinja_env.globals.update(to_json=dumps)

    @app.before_request
    def extend_jinja_env():
        app.jinja_env.globals['today'] = date.today()
        app.jinja_env.globals['next_month'] = to_year_month_string(get_next_month())
    
        def get_affiliation():
            return AffiliationQuery(get_db_session()).get_default_affiliation()
    
        app.jinja_env.globals['default_affiliation_id'] = get_affiliation().id
    
        def get_operator_id():
            operator_query = OperatorQuery(get_db_session())
            return operator_query.get_operator_of_user_id(current_user.id).id if current_user.is_authenticated else ""
    
        app.jinja_env.globals['operator_id'] = get_operator_id()
    
    return app
