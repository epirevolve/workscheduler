# -*- coding: utf-8 -*-

from services import UserFacade


class UserFacadeAdapter:
    def __init__(self, session):
        self._session = session
    
    def login(self, data):
        return UserFacade(self._session).login(
            data.get('loginId'), data.get('password'))

    def append_team(self, data):
        name = data.get('name')
        note = data.get('note')
        if not name:
            raise ValueError()
        return UserFacade(self._session).append_team(name, note)
