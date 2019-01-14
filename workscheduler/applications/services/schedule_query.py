# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import Belong
from workscheduler.domains.models.scheduler import (
    Options, WorkCategory
)


class ScheduleQuery:
    def __init__(self, session):
        self._session = session
        
    def get_option(self, id: str) -> Options:
        return self._session.query(Options).get(id)
    
    def get_option_of_belong_id(self, belong_id: str) -> Options:
        return self._session.query(Options)\
            .filter(Options.belong.has(Belong.id == belong_id)).one_or_none()
    
    def get_work_category(self, id: str) -> WorkCategory:
        return self._session.query(WorkCategory).get(id)
