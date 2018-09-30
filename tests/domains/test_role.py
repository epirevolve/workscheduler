# -*- coding: utf-8 -*-

from workscheduler.domains.models.role import Role, RoleFactory


class TestRole:
    def test_role_is_admin(self):
        role = Role('1', "管理者", 1)
        assert role.is_admin
    
    def test_role_is_not_admin(self):
        role = Role('3', 'オペレータ', 0)
        assert not role.is_admin
        
    def test_role_factory(self):
        role = RoleFactory.new_role('テスター', False)
        assert role.id
        assert role.name
        assert not role.is_admin
    
    def test_role_factory_identifier(self):
        role = RoleFactory.new_role('テスター', False)
        another_role = RoleFactory.new_role('他の役割', True)
        assert role.id != another_role.id
