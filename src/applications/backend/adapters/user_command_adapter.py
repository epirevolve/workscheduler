# -*- coding: utf-8 -*-

from backend.services import UserCommand
from backend.services.domain_orm import to_user
from backend.services.domain_orm import to_team


class UserCommandAdapter:
    def __init__(self, session):
        self._session = session

    def save_user(self, data: dict):
        user = to_user(data)
        return UserCommand(self._session).save_user(user)

    def activate(self, id_):
        return UserCommand(self._session).activate_user(id_)

    def inactivate(self, id_):
        return UserCommand(self._session).inactivate_user(id_)

    def reset_password(self, id_):
        return UserCommand(self._session).reset_user_password(id_)

    def update_team(self, data: dict):
        team = to_team(data)
        return UserCommand(self._session).save_team(team)

    def remove_team(self, id_):
        UserCommand(self._session).remove_team(id_)
