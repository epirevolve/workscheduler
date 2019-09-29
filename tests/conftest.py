# -*- coding: utf-8 -*-

import pytest
import tempfile

from src.applications.services import UserQuery
from src.infrastructures.database import Database


@pytest.fixture
def session():
    db_fd, db_path = tempfile.mkstemp()
    database = Database('sqlite:///{}.db'.format(db_path))
    database.set_test()
    session = database.create_session()
    yield session
    session.close()


@pytest.fixture
def random_user(session):
    user_repository = UserQuery(session)
    users = user_repository.get_users()
    import random
    return users[random.randint(0, len(users) - 1)]
