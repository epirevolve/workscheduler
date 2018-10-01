# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import UserFactory


class TestUser:
    def test_user_factory(self):
        user = UserFactory.new_user('tester', 'test', 'てすたろう', is_admin=True, is_operator=False)
        assert user.id
        assert 'tester' == user.login_id
        assert 'test' == user.password
        assert 'てすたろう' == user.name
        assert user.is_admin
        assert not user.is_operator
    
    def test_user_factory_identifier(self):
        user_1 = UserFactory.new_user('user_1', 'user1', 'User', False, True)
        user_2 = UserFactory.new_user('user_2', 'user2', 'UUSser', True, False)
        assert user_1.id != user_2.id
