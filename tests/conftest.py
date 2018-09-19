# -*- coding: utf-8 -*-

import pytest
from tests.db_test_set import DbTestSetting
from workscheduler.infrastructures.session import SessionFactory


@pytest.fixture
def session():
    setting = DbTestSetting()
    session = SessionFactory(setting.get_db_path()).create()
    setting.init_db(session)
    session.commit()
    yield session
    session.close()
