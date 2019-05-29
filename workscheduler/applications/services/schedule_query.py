# -*- coding: utf-8 -*-

from domains.models.schedule import Schedule


class ScheduleQuery:
    def __init__(self, session):
        self._session = session
    
    def get_schedules_of_affiliation_year_month(self, affiliation_id: str, month: int, year: int):
        return self._session.query(Schedule)\
            .filter(Schedule.affiliation_id == affiliation_id,
                    Schedule.year == year,
                    Schedule.month == month).one_or_none()
