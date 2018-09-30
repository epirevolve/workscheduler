# -*- coding: utf-8 -*-

import pytest
from workscheduler.infrastructures.database import Database
import tempfile


@pytest.fixture
def session():
    db_fd, db_path = tempfile.mkstemp()
    database = Database('sqlite:///{}'.format(db_path))
    database.init()
    session = database.create_session()
    yield session
    session.close()
