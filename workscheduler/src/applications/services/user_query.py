# -*- coding: utf-8 -*-

from domains.models.user import User
from domains.models.user import Team


class UserQuery:
    def __init__(self, session):
        self._session = session
    
    def get_user(self, id: str) -> User:
        return self._session.query(User).get(id)

    def get_users(self) -> [User]:
        return self._session.query(User).order_by(User.id).all()

    def get_team(self, id: str):
        return self._session.query(Team).get(id)

    def get_teams(self):
        return self._session.query(Team).order_by(Team.id).all()

    def get_default_team(self):
        return next(filter(lambda x: x.is_default, self.get_teams()))

    def get_teams_without_default(self):
        default_team = self.get_default_team()
        teams = [b for b in self.get_teams() if not b.id == default_team.id]
        return teams
