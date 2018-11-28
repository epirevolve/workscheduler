# -*- coding: utf-8 -*-

import pytest
from workscheduler.infrastructures.database import Database
import tempfile
from workscheduler.applications.services import UserQuery


@pytest.fixture
def session():
    db_fd, db_path = tempfile.mkstemp()
    database = Database(db_path)
    database.init()
    session = database.create_session()
    yield session
    session.close()

@pytest.fixture
def random_user(session):
    user_repository = UserQuery(session)
    users = user_repository.get_users()
    import random
    return users[random.randint(0, len(users) - 1)]
