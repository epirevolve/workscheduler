# -*- coding: utf-8 -*-

from workscheduler.domains.services.authenticator import Authenticator

from infrastructures.sqlite_user_repository import UserRepository, SqliteUserRepository
import inject


def config(binder):
    binder.bind(UserRepository, SqliteUserRepository('test_workscheduler.db'))


inject.clear()
inject.configure(config)


def test_login_true():
    user = Authenticator('admin', 'minAd').login()
    assert user is not None
