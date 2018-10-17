# -*- coding: utf-8 -*-

import pytest
from workscheduler.applications.web import create_app
from workscheduler.infrastructures.database import Database
from workscheduler.infrastructures.user_query import UserRepository
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
def db_session(app):
    return Database(app.config['DATABASE']).create_session()


@pytest.fixture
def random_user(db_session):
    user_repository = UserRepository(db_session)
    users = user_repository.get_users()
    import random
    return users[random.randint(0, len(users) - 1)]


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
