# -*- coding: utf-8 -*-

import pytest
from workscheduler.applications.web import create_app
from workscheduler.infrastructures.database import Database
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
        Database(app.config['DATABASE']).init()
    yield app
    
    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
