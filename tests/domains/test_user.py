# -*- coding: utf-8 -*-

import pytest

from workscheduler.domains.models.user import Affiliation
from workscheduler.domains.models.user import User


class TestUser:
    def test_validate(self):
        affiliation = Affiliation.new('test', 'this is test')
        user = User.new('user_1', 'User', affiliation.id, False, True)
        with pytest.raises(AssertionError) as error:
            user.id = ''
        assert 'no id provided' == str(error.value)

        with pytest.raises(AssertionError) as error:
            user.login_id = ''
        assert 'no login_id provided' == str(error.value)
        with pytest.raises(AssertionError) as error:
            user.login_id = 'aaaaabbbbbcccccdd'
        assert 'login_id is less than 16' == str(error.value)

        with pytest.raises(AssertionError) as error:
            user.password = ''
        assert 'no password provided' == str(error.value)
        with pytest.raises(AssertionError) as error:
            user.password = 'aaaaabbbbbcccccdd'
        assert 'password is less than 16' == str(error.value)

        with pytest.raises(AssertionError) as error:
            user.name = ''
        assert 'no name provided' == str(error.value)
        with pytest.raises(AssertionError) as error:
            user.name = 'aaaaabbbbbcccccdddddeeeeefffffggggghhhhhiiiiijjjjjk'
        assert 'name is less than 50' == str(error.value)

    def test_user_factory(self):
        affiliation = Affiliation.new('test', 'this is test')
        user = User.new('tester', 'てすたろう', affiliation,
                        is_admin=True, is_operator=False)
        assert user.id
        assert 'tester' == user.login_id
        assert 'ptester' == user.password
        assert 'てすたろう' == user.name
        assert user.is_admin
        assert not user.is_operator

    def test_user_factory_identifier(self):
        affiliation = Affiliation.new('test', 'this is test')
        user_1 = User.new('user_1', 'User', affiliation.id, False, True)
        user_2 = User.new('user_2', 'UUSser', affiliation.id, True, False)
        assert user_1.id != user_2.id

    def test_reset_password(self, random_user):
        random_user.password = 'test override'
        random_user.reset_password()
        assert 'p' + random_user.login_id == random_user.password
