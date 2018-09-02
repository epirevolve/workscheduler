# -*- coding: utf-8 -*-

from workscheduler.domains.services.authenticator import Authenticator
from workscheduler.domains.models.operator import Operator
import workscheduler.infrastructures.sqlite_user_repository as user_rep


def test_login_false(monkeypatch):
    monkeypatch.setattr(user_rep, 'get_users', lambda: [Operator(1, "admin", "minAd", 8)])
    
    user_id = "none"
    user_password = "noNe"
    authenticator = Authenticator(user_id, user_password)
    assert authenticator.login() is None


def test_login_true(monkeypatch):
    user_id = "admin"
    user_password = "minAd"
    authenticator = Authenticator(user_id, user_password)
    assert authenticator.login() is not None
