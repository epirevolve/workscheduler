# -*- coding: utf-8 -*-

from domains.models.user import User, UserFactory


class TestUser:
    def test_user_factory(self):
        user = UserFactory.new_user('tester', 'test', 'てすたろう', 'role_id')
        assert user.identifier
        assert 'tester' == user.login_id
        assert 'test' == user.password
        assert 'てすたろう' == user.name
        assert 'role_id' == user.role_identifier
    
    def test_user_factory_identifier(self):
        user_1 = UserFactory.new_user('user_1', 'user1', 'User', 'role')
        user_2 = UserFactory.new_user('user_2', 'user2', 'UUSser', 'role2')
        assert user_1.identifier != user_2.identifier
