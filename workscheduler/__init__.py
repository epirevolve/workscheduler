# -*- coding: utf-8 -*-

import os
from flask import Flask, g
import sqlite3


# create the application instance
app = Flask(__name__)
app.config.from_object(__name__)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'workscheduler.db'),
    SECRET_KEY='key secreted',
))
app.config.from_envvar('SHIFT_SCHEDULER_SETTING', silent=True)

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


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def get_db():
    """Open a new database connection if there is none yet for
    the current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Close the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()


def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()


@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')
