# -*- coding: utf-8 -*-

from flask import g
from flask import current_app


def get_db_session(echo=False):
    if 'db_session' not in g:
        from infrastructures import Database
        g.db_session = Database(current_app.config['DATABASE'], echo).create_session()
    return g.db_session


def close_db_session(e=None):
    db_session = g.pop('db_session', None)
    if db_session:
        db_session.commit()
        db_session.close()
