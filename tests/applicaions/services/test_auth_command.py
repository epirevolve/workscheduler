# -*- coding: utf-8 -*-

from workscheduler.applications.services import AuthCommand


class TestAuthenticationService:
    def test_login_true(self, session):
        user = AuthCommand(session).login('admin', 'padmin')
        assert user is not None

    def test_login_false(self, session):
        user = AuthCommand(session).login('admin', 'noNe')
        assert user is None
        user = AuthCommand(session).login('none', 'minAd')
        assert user is None
        user = AuthCommand(session).login('none', 'noNe')
        assert user is None
