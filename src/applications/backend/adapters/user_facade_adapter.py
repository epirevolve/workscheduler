# -*- coding: utf-8 -*-

from backend.services import UserFacade
from backend.services.domain_orm import to_user
from backend.services.domain_orm import to_team


class UserFacadeAdapter:
    def __init__(self, session):
        self._session = session
    
    def login(self, data):
        return UserFacade(self._session).login(
            data.get('loginId'), data.get('password'))

    def append_user(self, data: dict):
        user = to_user(data)
        return UserFacade(self._session).append_user(user)

    def append_team(self, data):
        team = to_team(data)
        return UserFacade(self._session).append_team(team)
