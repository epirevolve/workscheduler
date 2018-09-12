# -*- coding: utf-8 -*-

from applications.services.authentication_service import AuthenticationService
from test.db_test_set import DbTestSetting
from infrastructures.db_connection import SessionContextFactory


class TestAuthenticationService:
    @classmethod
    def setup_class(cls):
        setting = DbTestSetting()
        cls.session = SessionContextFactory(setting.get_db_path())
        with cls.session.create() as session:
            setting.sqlite_db_initialize(session)
            session.commit()
    
    def test_login_true(self):
        with self.session.create() as session:
            user = AuthenticationService(session).login('admin', 'minAd')
        assert user is not None
    
    def test_login_false(self):
        with self.session.create() as session:
            user = AuthenticationService(session).login('admin', 'noNe')
            assert user is None
            user = AuthenticationService(session).login('none', 'minAd')
            assert user is None
            user = AuthenticationService(session).login('none', 'noNe')
            assert user is None
