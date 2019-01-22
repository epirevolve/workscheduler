# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import TeamCategory


class TeamQuery:
    def __init__(self, session):
        self._session = session

    def get_team_categories(self) -> [TeamCategory]:
        return self._session.query(TeamCategory).order_by(TeamCategory.id).all()

    def get_team_category(self, id_: str) -> TeamCategory:
        return self._session.query(TeamCategory).get(id_)
