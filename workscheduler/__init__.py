# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask
from jinja2 import FileSystemLoader


# create the application instance
app = Flask(__name__, static_folder='applications/web/static')
app.jinja_loader = FileSystemLoader(os.path.join(os.path.dirname(__file__), 'applications/web/templates'))
app.config.from_object(__name__)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'workscheduler.db'),
    SECRET_KEY='key secreted',
))
app.config.from_envvar('WORK_SCHEDULER_SETTING', silent=True)

sys.path.append(os.path.dirname(__file__))

from infrastructures.sqlite_user_repository import UserRepository, SqliteUserRepository
import inject


def config(binder):
    binder.bind(UserRepository, SqliteUserRepository(app.config['DATABASE']))


inject.configure(config)

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
    from infrastructures.sqlite_connection import SqliteConnection
    """Initializes the database."""
    SqliteConnection(app.config['DATABASE']).init_db()
    print('Initialized the database.')
