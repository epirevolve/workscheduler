# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.models.user import User
from . import TeamQuery
from . import UserQuery


class UserCommand:
    def __init__(self, session):
        self._session = session
    
    def update_myself(self, id_: str, password: str, name: str):
        user = UserQuery(self._session).get_user(id_)
        user.password = password
        user.name = name
        return user
    
    def append_user(self, login_id: str, name: str,
                    team_id: str, is_admin: bool, is_operator: bool):
        team = TeamQuery(self._session).get_team(team_id)
        user = User.new(login_id, name, team, is_admin, is_operator)
        self._session.add(user)
        self._session.add(Operator.new(user))
        return user
    
    def update_user(self, id_: str, login_id: str, name: str,
                    team_id: str, is_admin: bool, is_operator: bool):
        user = UserQuery(self._session).get_user(id_)
        user.login_id = login_id
        user.name = name
        user.team = TeamQuery(self._session).get_team(team_id)
        user.is_admin = is_admin
        user.is_operator = is_operator
        return user

    def activate(self, id_: str):
        user = UserQuery(self._session).get_user(id_)
        user.is_inactivated = False
        return user

    def inactivate(self, id_: str):
        user = UserQuery(self._session).get_user(id_)
        user.is_inactivated = True
        return user

    def reset_password(self, id_: str):
        user = UserQuery(self._session).get_user(id_)
        user.reset_password()
        return user
