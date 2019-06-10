# -*- coding: utf-8 -*-

from applications.services import TeamFacade


class TeamFacadeAdapter:
    def __init__(self, session):
        self._session = session
    
    def append_team(self, data):
        name = data.get('name')
        note = data.get('note')
        if not name:
            raise ValueError()
        return TeamFacade(self._session).append_team(name, note)
