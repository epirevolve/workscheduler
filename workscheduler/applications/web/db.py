# -*- coding: utf-8 -*-

import click
from flask import g, current_app
from flask.cli import with_appcontext

from workscheduler.domains.models.role import RoleFactory
from workscheduler.domains.models.user import UserFactory
from workscheduler.infrastructures.user_repository import UserRepository


def get_db_session():
    if 'db_session' not in g:
        from workscheduler.infrastructures.session import SessionFactory
        g.db_session = SessionFactory(current_app.config['DATABASE']).create()
    return g.db_session


def close_db_session(e=None):
    db_session = g.pop('db_session', None)
    if db_session:
        db_session.commit()
        db_session.close()


def init_db(session):
    # set initial users and roles
    user_repository = UserRepository(session)
    
    admin_role = RoleFactory.new_role('管理者', is_admin=True)
    user_repository.store_role(admin_role)
    operator_role = RoleFactory.new_role('オペレータ', is_admin=False)
    user_repository.store_role(operator_role)
    
    user_repository.store_user(UserFactory.new_user('admin', 'minAd', '管理者', admin_role.identifier))
    user_repository.store_user(UserFactory.new_user('user', 'user', 'ユーザ', operator_role.identifier))


@click.command('init-db')
@with_appcontext
def init_db_command():
    with get_db_session() as session:
        init_db(session)
        session.commit()
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db_session)
    app.cli.add_command(init_db_command)
