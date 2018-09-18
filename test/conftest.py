# -*- coding: utf-8 -*-

import pytest
from test.db_test_set import DbTestSetting
from workscheduler.infrastructures.db_connection import SessionContextFactory


@pytest.fixture
def session():
    setting = DbTestSetting()
    with SessionContextFactory(setting.get_db_path()).create() as session:
        setting.sqlite_db_initialize(session)
        yield session
        session.close()
