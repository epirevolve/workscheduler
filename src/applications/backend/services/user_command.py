# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.models.user import User
from domains.models.user import Team

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
        team = UserQuery(self._session).get_team(team_id)
        user = User.new(login_id, name, team, is_admin, is_operator)
        self._session.add(user)
        self._session.add(Operator.new(user))
        return user
    
    def update_user(self, id_: str, login_id: str, name: str,
                    team_id: str, is_admin: bool, is_operator: bool):
        user = UserQuery(self._session).get_user(id_)
        user.login_id = login_id
        user.name = name
        user.team = UserQuery(self._session).get_team(team_id)
        user.is_admin = is_admin
        user.is_operator = is_operator
        return user

    def activate_user(self, id_: str):
        user = UserQuery(self._session).get_user(id_)
        user.is_inactivated = False
        return user

    def inactivate_user(self, id_: str):
        user = UserQuery(self._session).get_user(id_)
        user.is_inactivated = True
        return user

    def reset_user_password(self, id_: str):
        user = UserQuery(self._session).get_user(id_)
        user.reset_password()
        return user

    def append_team(self, name: str, note: str):
        team = Team.new(name, note)
        self._session.add(team)
        return team

    def update_team(self, id_: str, name: str, note: str):
        team = UserQuery(self._session).get_team(id_)
        team.name = name
        team.note = note
        return team

    def remove_team(self, id_: str):
        team = UserQuery(self._session).get_team(id_)
        self._session.delete(team)
