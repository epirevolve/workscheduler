# -*- coding: utf-8 -*-

import pytest

import src.utils.jsonize as jsonize

from src.applications.backend.adapters import UserFacadeAdapter
from src.applications.backend.services import UserQuery
from src.applications.backend.services import OperatorQuery
from src.applications.backend.services import SchedulerQuery

from src.domains.models.user import User
from src.domains.models.user import Team
from src.domains.models.user import UserRole


class TestUserFacadeAdapter:
    @pytest.fixture
    def teams(self, session):
        return UserQuery(session).get_teams()

    @pytest.mark.parametrize("a, b", [
        ("user1", "puser1"),
        ("user2", "puser2")
    ])
    def test_login(self, session, a, b):
        adapter = UserFacadeAdapter(session)

        assert adapter.login({'loginId': a, 'password': b})

    @pytest.mark.parametrize("a, b", [
        ("user1", "user1"),
        ("user1", "password")
    ])
    def test_login_exception(self, session, a, b):
        adapter = UserFacadeAdapter(session)

        assert not adapter.login({'loginId': a, 'password': b})

    @pytest.mark.parametrize("a, b, c, d", [
        ("test_user_1", "テストしてます", 0, UserRole.OPERATOR),
        ("test user 1", "テストしてます", 2, UserRole.DEVELOPER),
        ("テストしてます", "テストしてます", 1, UserRole.ADMINISTRATOR)
    ])
    def test_append_user(self, session, a, b, c, d, teams):
        adapter = UserFacadeAdapter(session)
        query1 = UserQuery(session)
        query2 = OperatorQuery(session)

        target = User.new(a, b, teams[c], d)
        data = jsonize.dumps(target)
        adapter.append_user(jsonize.loads(data))
        session.flush()

        result = query1.get_user(target.id)
        assert result
        assert target.id == result.id
        assert target.login_id == result.login_id == a
        assert target.password == result.password == 'p'+a
        assert target.name == result.name == b
        assert target.team == result.team == teams[c]
        assert target.role.value == result.role.value == d.value
        assert target.is_inactivated == result.is_inactivated is False

        result = query2.get_operator_of_user_id(target.id)
        assert result
        assert result.user.id == target.id
        assert result.remain_paid_holidays == 0
        assert len(result.skills) == 0
        assert not result.ojt

    @pytest.mark.parametrize('a, b', [
        ('test team', 'this is a test team'),
        ('accompany team', '')
    ])
    def test_append_team(self, session, a, b):
        adapter = UserFacadeAdapter(session)
        query1 = UserQuery(session)
        query2 = SchedulerQuery(session)

        target = Team.new(a, b)
        data = jsonize.dumps(target)
        adapter.append_team(jsonize.loads(data))
        session.flush()

        result = query1.get_team(target.id)
        assert result
        assert target.id == result.id
        assert target.name == result.name == a
        assert target.note == result.note == b
        assert target.is_main == result.is_main is False
        assert target.is_require_leader == result.is_require_leader is False

        result = query2.get_scheduler_of_team_id(target.id)
        assert result
        assert result.team.id == target.id
