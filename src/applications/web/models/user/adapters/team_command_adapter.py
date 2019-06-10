# -*- coding: utf-8 -*-

from applications.services import TeamCommand


class TeamCommandAdapter:
    def __init__(self, session):
        self._session = session
        
    def update_team(self, data: dict):
        return TeamCommand(self._session).update_team(
            data.get('id'), data.get('name'), data.get('note')
        )
    
    def remove_team(self, id_):
        TeamCommand(self._session).remove_team(id_)
