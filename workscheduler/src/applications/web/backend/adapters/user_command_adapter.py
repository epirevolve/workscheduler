# -*- coding: utf-8 -*-

from applications.services import UserCommand
from applications.services.domain_orm import to_user
from applications.services.domain_orm import to_team


class UserCommandAdapter:
    def __init__(self, session):
        self._session = session

    def save_user(self, data: dict):
        user = to_user(data)
        return UserCommand(self._session).save_user(user)

    def activate_user(self, id):
        return UserCommand(self._session).activate_user(id)

    def inactivate_user(self, id):
        return UserCommand(self._session).inactivate_user(id)

    def reset_user_password(self, id):
        return UserCommand(self._session).reset_user_password(id)

    def save_team(self, data: dict):
        team = to_team(data)
        return UserCommand(self._session).save_team(team)

    def remove_team(self, id):
        UserCommand(self._session).remove_team(id)
