# -*- coding: utf-8 -*-

from workscheduler.domains.models.team import (
    TeamCategory, Team
)

class TeamQuery:
    def __init__(self, session):
        self._session = session

    def get_team_categories(self) -> [TeamCategory]:
        return self._session.query(TeamCategory).order_by(TeamCategory.id).all()

    def get_team_category(self, id: str) -> TeamCategory:
        return self._session.query(TeamCategory).get(id)

    def get_teams(self, team_category_id: str) -> [Team]:
        return self._session.query(Team).filter(Team.team_category_id == team_category_id).all()

    def get_team(self, id: str) -> Team:
        return self._session.query(Team).get(id)

