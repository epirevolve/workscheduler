# -*- coding: utf-8 -*-

from workscheduler.infrastructures.sqlite_user_repository import SqliteUserRepository
from test.db_test_set import DbTestSetting


class TestSqlUserRepository:
    @classmethod
    def setup_class(cls):
        setting = DbTestSetting()
        cls.user_repository = SqliteUserRepository(setting.get_db_path())
        setting.sqlite_db_initialize()

    def test_get_users(self):
        users = self.user_repository.get_users()
        assert 2 == len(users)
        user = users[0]
        assert 1 == user.id
        assert 'admin' == user.login_id
        assert 'minAd' == user.password
        assert '管理者' == user.name
        assert 1 == user.role.id
        assert '管理者' == user.role.name
    
    def test_append_user(self):
        self.user_repository.append_user('test_login', 'login_pass', 'tester', 2)
        users = self.user_repository.get_users()
        assert 3 == len(users)
        user = users[2]
        assert 3 == user.id
        assert 'test_login' == user.login_id
        assert 'login_pass' == user.password
        assert 'tester' == user.name
        assert 2 == user.role.id
        assert 'オペレータ' == user.role.name
    
    def test_get_operators(self):
        self.user_repository.get_operators()
        
    def test_get_roles(self):
        roles = self.user_repository.get_roles()
        assert 2 == len(roles)
        role = roles[0]
        assert 1 == role.id
        assert '管理者' == role.name
        assert role.is_admin
    
    def test_append_role(self):
        self.user_repository.append_role('test', False)
        roles = self.user_repository.get_roles()
        assert 3 == len(roles)
        role = roles[2]
        assert 3 == role.id
        assert 'test' == role.name
        assert not role.is_admin
