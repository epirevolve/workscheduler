# -*- coding: utf-8 -*-

import pytest
from workscheduler.applications.web import create_app
from test.db_test_set import DbTestSetting


@pytest.fixture
def app():
    setting = DbTestSetting()
    app = create_app(
        {'TESTING': True,
         'DATABASE': setting.get_db_path()}
    )
    return app


@pytest.fixture
def client(app):
    return app.test_client()
