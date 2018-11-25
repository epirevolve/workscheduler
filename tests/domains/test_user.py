# -*- coding: utf-8 -*-

from workscheduler.domains.models.user.user import UserFactory, UserInfoUpdated, InvalidUserOperated
from mylibraries.domainevent import Publisher, Subscriber
import pytest


class TestUser:
    def test_user_factory(self):
        user = UserFactory.join_a_member('tester', 'てすたろう', is_admin=True, is_operator=False)
        assert user.id
        assert 'tester' == user.login_id
        assert 'ptester' == user.password
        assert 'てすたろう' == user.name
        assert user.is_admin
        assert not user.is_operator
    
    def test_user_factory_identifier(self):
        user_1 = UserFactory.join_a_member('user_1', 'User', False, True)
        user_2 = UserFactory.join_a_member('user_2', 'UUSser', True, False)
        assert user_1.id != user_2.id

    @pytest.fixture
    def error_detect(self):
        self.error = 0

        def handler(e):
            self.error += 1

        Publisher.subscribe(Subscriber(handler, InvalidUserOperated))
        yield
        self.error = 0
        Publisher.clear_subscribers()

    def test_change_login_id(self, random_user, error_detect):
        def handler(e):
            assert 'login id is changed' == e.event_message

        Publisher.subscribe(Subscriber(handler, UserInfoUpdated))

        random_user.change_login_id('random changed')
        assert 'random changed' == random_user.login_id

        random_user.change_name('')
        assert 'random changed' == random_user.login_id
        assert 1 == self.error

    def test_change_name(self, random_user, error_detect):
        def handler(e):
            assert "name is changed" == e.event_message

        Publisher.subscribe(Subscriber(handler, UserInfoUpdated))

        random_user.change_name('random changed')
        assert 'random changed' == random_user.name

        random_user.change_name('')
        assert 'random changed' == random_user.name
        assert 1 == self.error

    def test_elevate_role(self, random_user, error_detect):
        def handler(e):
            assert "user role is elevated" == e.event_message

        Publisher.subscribe(Subscriber(handler, UserInfoUpdated))

        random_user.elevate_role(True, False)
        assert random_user.is_admin
        assert not random_user.is_operator

        random_user.elevate_role(False, True)
        assert not random_user.is_admin
        assert random_user.is_operator

    def test_reset_password(self, random_user):
        def handler(e):
            assert 'password is reset' == e.event_message

        Publisher.subscribe(Subscriber(handler, UserInfoUpdated))

        random_user.password = 'test override'
        random_user.reset_password()
        assert 'p' + random_user.login_id == random_user.password
