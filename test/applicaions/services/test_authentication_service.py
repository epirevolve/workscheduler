# -*- coding: utf-8 -*-

from workscheduler.applications.services.authentication_service import AuthenticationService


class TestAuthenticationService:
    def test_login_true(self, session):
        user = AuthenticationService(session).login('admin', 'minAd')
        assert user is not None
    
    def test_login_false(self, session):
        user = AuthenticationService(session).login('admin', 'noNe')
        assert user is None
        user = AuthenticationService(session).login('none', 'minAd')
        assert user is None
        user = AuthenticationService(session).login('none', 'noNe')
        assert user is None
