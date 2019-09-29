# -*- coding: utf-8 -*-

import pytest
import tempfile
import os

from applications.backend import create_app
from applications.services import UserQuery
from infrastructures import InputData


@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()
    app = create_app(
        {'TESTING': True,
         'DATABASE': db_path,
         'WTF_CSRF_ENABLED': False}
    )
    with app.app_context():
        database = InputData(app.config['DATABASE'])
        database.set_test()
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
    user_repository = UserQuery(db_session)
    users = user_repository.get_users()
    import random
    return users[random.randint(0, len(users) - 1)]


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
