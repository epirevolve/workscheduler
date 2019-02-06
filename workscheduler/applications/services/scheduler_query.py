# -*- coding: utf-8 -*-

from workscheduler.domains.models.scheduler import BasicOptions
from workscheduler.domains.models.scheduler import WorkCategory
from workscheduler.domains.models.scheduler import Calendar
from workscheduler.domains.models.scheduler import Request
from workscheduler.domains.models.user import Affiliation


class SchedulerQuery:
    def __init__(self, session):
        self._session = session
        
    def get_option(self, id_: str) -> BasicOptions:
        return self._session.query(BasicOptions).get(id_)
    
    def get_option_of_affiliation_id(self, affiliation_id: str) -> BasicOptions:
        return self._session.query(BasicOptions)\
            .filter(BasicOptions.affiliation.has(Affiliation.id == affiliation_id)).one_or_none()
    
    def get_work_category(self, id_: str) -> WorkCategory:
        return self._session.query(WorkCategory).get(id_)
    
    def get_calendar_of_affiliation_id_year_month(self, affiliation_id: str, year: int, month: int) -> Calendar:
        return self._session.query(Calendar)\
            .filter(Calendar.affiliation.has(Affiliation.id == affiliation_id),
                    Calendar.year == year,
                    Calendar.month == month).one_or_none()
    
    def get_calendar_of_request_id(self, request_id: str) -> [Calendar]:
        return self._session.query(Calendar)\
            .filter(Calendar.requests.has(Request.id == request_id)).all()
