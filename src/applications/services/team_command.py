# -*- coding: utf-8 -*-

from domains.models.user import Team

from .team_query import TeamQuery


class TeamCommand:
    def __init__(self, session):
        self._session = session
        
    def append_team(self, name: str, note: str):
        team = Team.new(name, note)
        self._session.add(team)
        return team
    
    def update_team(self, id_: str, name: str, note: str):
        team = TeamQuery(self._session).get_team(id_)
        team.name = name
        team.note = note
        return team
    
    def remove_team(self, id_: str):
        team = TeamQuery(self._session).get_team(id_)
        self._session.delete(team)
