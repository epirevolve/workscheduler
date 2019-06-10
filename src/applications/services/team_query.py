# -*- coding: utf-8 -*-

from domains.models.user import Team


class TeamQuery:
    def __init__(self, session):
        self._session = session
    
    def get_team(self, id_: str):
        return self._session.query(Team).get(id_)

    def get_teams(self):
        return self._session.query(Team).order_by(Team.id).all()
    
    def get_default_team(self):
        return next(filter(lambda x: x.is_default, self.get_teams()))
    
    def get_teams_without_default(self):
        default_team = self.get_default_team()
        teams = [b for b in self.get_teams() if not b.id == default_team.id]
        return teams
