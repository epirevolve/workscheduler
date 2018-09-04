# -*- coding: utf-8 -*-

from workscheduler.domains.services.authenticator import Authenticator
from test.db_test_set import DbTestSetting


class TestAuthenticator:
    @classmethod
    def setup_class(cls):
        setting = DbTestSetting()
        setting.sqlite_db_initialize()
    
    def test_login_true(self):
        user = Authenticator('admin', 'minAd').login()
        assert user is not None
    
    def test_login_false(self):
        user = Authenticator('admin', 'noNe').login()
        assert user is None
        user = Authenticator('none', 'minAd').login()
        assert user is None
        user = Authenticator('none', 'noNe').login()
        assert user is None
