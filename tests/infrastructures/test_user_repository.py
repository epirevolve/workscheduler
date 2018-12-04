# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import UserFactory
from workscheduler.applications.services import UserQuery


class TestUserRepository:
    def test_get_user(self, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        user = users[0]
        get_user = user_repository.get_user(user.id)
        assert get_user
        assert user.id == get_user.id

    def test_get_users(self, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        assert 2 == len(users)
        user = users[0]
        assert user.id
        assert 'admin' == user.login_id
        assert 'padmin' == user.password
        assert '管理者' == user.name
        assert user.create_at
    
    def test_append_user(self, session):
        user_repository = UserQuery(session)
        user = UserFactory.join_a_member('test_login', 'tester', is_admin=False, is_operator=True)
        session.add(user)
        session.commit()
        users = user_repository.get_users()
        assert 3 == len(users)
        user = users[2]
        assert user.id
        assert 'test_login' == user.login_id
        assert 'ptest_login' == user.password
        assert 'tester' == user.name
        assert not user.is_admin
        assert user.is_operator

    def test_update_user(self, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        user = users[1]
        import copy
        origin_user = copy.copy(user)
        user.login_id = 'testchanged'
        session.commit()
        users = user_repository.get_users()
        assert 2 == len(users)
        user = users[1]
        assert user.id
        assert 'testchanged' == user.login_id
        assert origin_user.login_id != user.login_id
        assert origin_user.password == user.password
        assert origin_user.name == user.name
        assert origin_user.is_admin == user.is_admin
        assert origin_user.is_operator == user.is_operator
        assert origin_user.create_at == user.create_at
