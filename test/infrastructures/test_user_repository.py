# -*- coding: utf-8 -*-

from workscheduler.domains.models.role import RoleFactory
from workscheduler.domains.models.user import UserFactory
from workscheduler.domains.models.relation import Relation


class TestUserRepository:
    def test_get_user(self, user_repository):
        users = user_repository.get_users()
        user, role = users[0]
        get_user, get_role = user_repository.get_user(user.identifier)
        assert get_user
        assert user.identifier == get_user.identifier
        assert role.identifier == get_role.identifier
    
    def test_get_users(self, user_repository):
        users = user_repository.get_users()
        assert 2 == len(users)
        user, role = users[0]
        assert user.identifier
        assert 'admin' == user.login_id
        assert 'minAd' == user.password
        assert '管理者' == user.name
        assert '管理者' == role.name
    
    def test_append_user(self, user_repository):
        roles = user_repository.get_roles()
        operator_role = roles[1]
        user_repository.store_user(UserFactory.new_user('test_login', 'login_pass', 'tester', operator_role.identifier))
        users = user_repository.get_users()
        assert 3 == len(users)
        user, role = users[2]
        assert user.identifier
        assert 'test_login' == user.login_id
        assert 'login_pass' == user.password
        assert 'tester' == user.name
        assert 'オペレータ' == role.name
    
    def test_get_role(self, user_repository):
        roles = user_repository.get_roles()
        role = user_repository.get_role(roles[1].identifier)
        assert roles[1].identifier == role.identifier
        role = user_repository.get_role('3')
        assert not role
    
    def test_get_roles(self, user_repository):
        roles = user_repository.get_roles()
        assert 2 == len(roles)
        role = roles[0]
        assert '管理者' == role.name
        assert role.is_admin
    
    def test_store_role(self, user_repository):
        user_repository.store_role(RoleFactory.new_role('test', False))
        roles = user_repository.get_roles()
        assert 3 == len(roles)
        role = roles[2]
        assert 'test' == role.name
        assert not role.is_admin
        
    def test_get_relations(self, user_repository):
        relations = user_repository.get_relations()
        assert 1 == len(relations)
        relation = relations[0]
        assert '1' == relation.identifier
        assert '1' == relation.user_1
        assert '2' == relation.user_2
        assert 0.8 == relation.affinity
        assert '1' == relation.looked_by
    
    def test_append_relation(self, user_repository):
        user_repository.append_relation(Relation('2', '1', '2', 0.4, '2'))
        relations = user_repository.get_relations()
        assert 2 == len(relations)
        relation = relations[1]
        assert '2' == relation.identifier
        assert '1' == relation.user_1
        assert '2' == relation.user_2
        assert 0.4 == relation.affinity
        assert '2' == relation.looked_by
