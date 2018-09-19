# -*- coding: utf-8 -*-

import pytest
from workscheduler.applications.web import create_app
import workscheduler.applications.web.db as db
import tempfile
import os


@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()
    app = create_app(
        {'TESTING': True,
         'DATABASE': 'sqlite:///{}'.format(db_path)}
    )
    with app.app_context():
        db.init_db(db.get_db_session())
    yield app
    
    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
