# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import Belong
from workscheduler.domains.models.schedule import (
    SchedulerOption, WorkCategory
)


class ScheduleQuery:
    def __init__(self, session):
        self._session = session
        
    def get_scheduler(self, id: str) -> SchedulerOption:
        return self._session.query(SchedulerOption).get(id)
    
    def get_scheduler_of_belong_id(self, belong_id: str) -> SchedulerOption:
        return self._session.query(SchedulerOption)\
            .filter(SchedulerOption.belong.has(Belong.id == belong_id)).one_or_none()
    
    def get_work_category(self, id: str) -> WorkCategory:
        return self._session.query(WorkCategory).get(id)
