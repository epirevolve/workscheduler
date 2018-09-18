# -*- coding: utf-8 -*-

import click
from flask import g, current_app
from flask.cli import with_appcontext


def get_db_session():
    if 'db_session' not in g:
        from workscheduler.infrastructures.db_connection import SessionFactory
        g.db_session = SessionFactory(current_app.config['DATABASE']).create()
    return g.db_session


def close_db_session(e=None):
    db_session = g.pop('db_session', None)
    if db_session:
        db_session.commit()
        db_session.close()


@click.command('init-db')
@with_appcontext
def init_db_command():
    from workscheduler.infrastructures.db_connection import DbConnection
    DbConnection().init_db(get_db_session())
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db_session)
    app.cli.add_command(init_db_command)
