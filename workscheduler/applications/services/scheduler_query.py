# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import Affiliation
from workscheduler.domains.models.scheduler import (
    Options, WorkCategory, Calendar
)


class SchedulerQuery:
    def __init__(self, session):
        self._session = session
        
    def get_option(self, id: str) -> Options:
        return self._session.query(Options).get(id)
    
    def get_option_of_affiliation_id(self, affiliation_id: str) -> Options:
        return self._session.query(Options)\
            .filter(Options.affiliation.has(Affiliation.id == affiliation_id)).one_or_none()
    
    def get_work_category(self, id: str) -> WorkCategory:
        return self._session.query(WorkCategory).get(id)

    def get_calendar(self, affiliation_id: str, year: int, month: int):
        return self._session.query(Calendar)\
            .filter(Calendar.affiliation.has(Affiliation.id == affiliation_id),
                    Calendar.year == year,
                    Calendar.month == month).one_or_none()
