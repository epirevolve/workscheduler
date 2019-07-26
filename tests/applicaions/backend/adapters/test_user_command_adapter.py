# -*- coding: utf-8 -*-

import pytest

import src.utils.jsonize as jsonize

from src.applications.backend.adapters import UserCommandAdapter
from src.applications.backend.services import UserQuery
from src.domains.models.user import UserRole


class TestUserCommandAdapter:
    @pytest.fixture
    def teams(self, session):
        return UserQuery(session).get_teams()

    @pytest.mark.parametrize('a, b, c, d, e, f', [
        ('this is test', 'this is pass', 'hello', 0, UserRole.OPERATOR, False),
        ('this is test 2', 'this is pass 2', 'hello 22', 1, UserRole.DEVELOPER, True)
    ])
    def test_save_user_update(self, session, teams, a, b, c, d, e, f):
        adapter = UserCommandAdapter(session)
        query = UserQuery(session)

        users = query.get_users()
        target = users[-1]
        target.login_id = a
        target.password = b
        target.name = c
        target.team = teams[d]
        target.role = e
        target.is_inactivate = f
        data = jsonize.dumps(target)
        adapter.save_user(jsonize.loads(data))
        session.flush()

        result = query.get_user(target.id)
        assert result
        assert target.id == result.id
        assert target.login_id == result.login_id == a
        assert target.password == result.password == b
        assert target.name == result.name == c
        assert target.team == result.team == teams[d]
        assert target.role.value == result.role.value == e.value
        assert target.is_inactivate == result.is_inactivated == f

    def test_activate_inactivate_user(self, session):
        adapter = UserCommandAdapter(session)
        query = UserQuery(session)

        users = query.get_users()
        target = users[-1]
        adapter.activate_user(target.id)
        session.flush()

        result = query.get_user(target.id)
        assert result
        assert result.is_inactivated is False

        adapter.inactivate_user(target.id)
        session.flush()

        result = query.get_user(target.id)
        assert result
        assert result.is_inactivated is True

        adapter.activate_user(target.id)
        session.flush()

        result = query.get_user(target.id)
        assert result
        assert result.is_inactivated is False

    def test_reset_user_password(self, session):
        adapter = UserCommandAdapter(session)
        query = UserQuery(session)

        users = query.get_users()
        target = users[-1]
        target.password = 'honyahonya'
        data = jsonize.dumps(target)
        adapter.save_user(jsonize.loads(data))
        session.flush()

        result = query.get_user(target.id)
        assert result
        assert result.password == 'honyahonya'

        adapter.reset_user_password(target.id)
        session.flush()

        result = query.get_user(target.id)
        assert result
        assert result.password == 'p'+result.login_id

    def test_save_team(self, session):
        pass

    def test_remove_team(self, session):
        pass
