# -*- coding: utf-8 -*-

from domains.models.user import User
from domains.models.user import Team

from . import UserQuery


class UserCommand:
    def __init__(self, session):
        self._session = session
    
    def save_user(self, user: User):
        self._session.merge(user)
        return user

    def activate_user(self, id: str):
        user = UserQuery(self._session).get_user(id)
        user.is_inactivated = False
        return user

    def inactivate_user(self, id: str):
        user = UserQuery(self._session).get_user(id)
        user.is_inactivated = True
        return user

    def reset_user_password(self, id: str):
        user = UserQuery(self._session).get_user(id)
        user.reset_password()
        return user

    def save_team(self, team: Team):
        self._session.merge(team)
        return team

    def remove_team(self, id: str):
        team = UserQuery(self._session).get_team(id)
        self._session.delete(team)
