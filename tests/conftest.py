# -*- coding: utf-8 -*-

import pytest
from workscheduler.infrastructures.database import Database
from workscheduler.domains.models.user.skill import SkillFactory
import tempfile


@pytest.fixture
def session():
    db_fd, db_path = tempfile.mkstemp()
    database = Database(db_path)
    database.init()
    session = database.create_session()
    
    yield session
    session.close()
