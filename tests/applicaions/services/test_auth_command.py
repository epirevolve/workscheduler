# -*- coding: utf-8 -*-

from applications.services import AuthFacade


class TestAuthenticationService:
    def test_login_true(self, session):
        user = AuthFacade(session).login('admin', 'padmin')
        assert user is not None

    def test_login_false(self, session):
        user = AuthFacade(session).login('admin', 'noNe')
        assert user is None
        user = AuthFacade(session).login('none', 'minAd')
        assert user is None
        user = AuthFacade(session).login('none', 'noNe')
        assert user is None
