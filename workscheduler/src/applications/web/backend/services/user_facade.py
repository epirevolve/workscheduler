# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.models.user import User
from domains.models.user import Team

from . import UserQuery
from . import UserCommand
from . import OperatorCommand
from . import SchedulerCommand


class UserFacade:
    def __init__(self, session):
        self._session = session

    @staticmethod
    def _login_check(login_id: str, password: str):
        def _inner(x: User):
            return login_id == x.login_id and password == x.password and not x.is_inactivated

        return _inner

    def login(self, login_id: str, password: str) -> User:
        _login_check = self._login_check(login_id, password)
        return next((x for x in UserQuery(self._session).get_users() if _login_check(x)), None)

    def append_user(self, user: User):
        UserCommand(self._session).save_user(user)
        self._session.flush()
        OperatorCommand(self._session).save_operator(Operator.new(user))
        return user

    def append_team(self, team: Team):
        team = UserCommand(self._session).save_team(team)
        self._session.flush()
        SchedulerCommand(self._session).append_scheduler(team.id)
        return team
