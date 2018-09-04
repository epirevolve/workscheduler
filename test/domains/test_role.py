# -*- coding: utf-8 -*-

from workscheduler.domains.models.role import Role


def test_role_is_admin_true():
    role = Role(1, "管理者", 1)
    assert role.is_admin


def test_role_is_admin_false():
    role = Role(3, 'オペレータ', 0)
    assert not role.is_admin
