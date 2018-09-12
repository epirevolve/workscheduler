# -*- coding: utf-8 -*-

from workscheduler.infrastructures.user_repository import UserRepository
from test.db_test_set import DbTestSetting
from workscheduler.domains.models.role import RoleFactory
from infrastructures.db_connection import SessionContextFactory


class TestSqlUserRepository:
    @classmethod
    def setup_class(cls):
        setting = DbTestSetting()
        cls.session = SessionContextFactory(setting.get_db_path()).create().session
        cls.user_repository = UserRepository(cls.session)
        setting.sqlite_db_initialize(cls.session)
        # cls.user_repository.append_relation(1, 2, 0.8, 1)

    @classmethod
    def teardown_class(cls):
        cls.session.close()
    
    def test_get_user(self):
        user = self.user_repository.get_user(2)
        assert user
        assert 2 == user.identifier
    
    def test_get_users(self):
        users = self.user_repository.get_users()
        assert 2 == len(users)
        user = users[0]
        assert 1 == user.identifier
        assert 'admin' == user.login_id
        assert 'minAd' == user.password
        assert '管理者' == user.name
        assert '管理者' == user.role.name
    
    def test_append_user(self):
        roles = self.user_repository.get_roles()
        operator_role = roles[1]
        self.user_repository.store_user('test_login', 'login_pass', 'tester', operator_role.identifier)
        users = self.user_repository.get_users()
        assert 3 == len(users)
        user = users[2]
        assert 3 == user.identifier
        assert 'test_login' == user.login_id
        assert 'login_pass' == user.password
        assert 'tester' == user.name
        assert 'オペレータ' == user.role.name
    
    def test_get_role(self):
        roles = self.user_repository.get_roles()
        role = self.user_repository.get_role(roles[1].identifier)
        assert roles[1].identifier == role.identifier
        role = self.user_repository.get_role(3)
        assert not role
    
    def test_get_roles(self):
        roles = self.user_repository.get_roles()
        assert 2 == len(roles)
        role = roles[0]
        assert '管理者' == role.name
        assert role.is_admin
    
    def test_store_role(self):
        self.user_repository.store_role(RoleFactory.new_role('test', False))
        roles = self.user_repository.get_roles()
        assert 3 == len(roles)
        role = roles[2]
        assert 'test' == role.name
        assert not role.is_admin
        
    def test_get_relations(self):
        relations = self.user_repository.get_relations()
        assert 1 == len(relations)
        relation = relations[0]
        assert 1 == relation.identifier
        assert 1 == relation.user_1
        assert 2 == relation.user_2
        assert 0.8 == relation.affinity
        assert 1 == relation.looked_by
    
    def test_append_relation(self):
        self.user_repository.append_relation(1, 2, 0.4, 2)
        relations = self.user_repository.get_relations()
        assert 2 == len(relations)
        relation = relations[1]
        assert 2 == relation.identifier
        assert 1 == relation.user_1
        assert 2 == relation.user_2
        assert 0.4 == relation.affinity
        assert 2 == relation.looked_by
