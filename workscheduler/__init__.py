# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask
from jinja2 import FileSystemLoader


# create the application instance
app = Flask(__name__, static_folder='applications/web/statics')
app.jinja_loader = FileSystemLoader(os.path.join(os.path.dirname(__file__), 'applications/web/templates'))
app.config.from_object(__name__)

app.config.update(dict(
    DATABASE='sqlite:///{}'.format(os.path.join(app.root_path, 'workscheduler.db')),
    SECRET_KEY='key secreted',
))
app.config.from_envvar('WORK_SCHEDULER_SETTING', silent=True)

sys.path.append(os.path.dirname(__file__))


from flask_login import LoginManager

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'users.login'


from applications.web.menus import menus
from applications.web.schedules import schedules
from applications.web.users import users

app.register_blueprint(menus)
app.register_blueprint(schedules)
app.register_blueprint(users)


@app.cli.command('initdb')
def initdb():
    from infrastructures.db_connection import SessionContextFactory, DbConnection
    """Initializes the database."""
    with SessionContextFactory(app.config['DATABASE']).create() as session:
        DbConnection().init_db(session)
    print('Initialized the database.')
