# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import Operator
from workscheduler.infrastructures.sqlite_user_repository import SqliteUserRepository, UserRepository


def test_user_is_admin_false():
    user = Operator(1, "test user", 7)
    assert not user.is_admin()


def test_user_is_admin_true():
    user = Operator(1, "test user", 8)
    assert user.is_admin()
