# -*- coding: utf-8 -*-

from domains.models.schedule import Schedule


class ScheduleQuery:
    def __init__(self, session):
        self._session = session
    
    def get_schedules_of_team_year_month(self, team_id: str, month: int, year: int):
        return self._session.query(Schedule)\
            .filter(Schedule.team_id == team_id,
                    Schedule.year == year,
                    Schedule.month == month).one_or_none()
