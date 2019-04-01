# -*- coding: utf-8 -*-

from workscheduler.domains.models.scheduler import Scheduler
from workscheduler.domains.models.scheduler import WorkCategory
from workscheduler.domains.models.scheduler import MonthlySetting
from workscheduler.domains.models.scheduler import Request
from workscheduler.domains.models.user import Affiliation


class SchedulerQuery:
    def __init__(self, session):
        self._session = session
        
    def get_scheduler(self, id_: str) -> Scheduler:
        return self._session.query(Scheduler).get(id_)
    
    def get_scheduler_of_affiliation_id(self, affiliation_id: str) -> Scheduler:
        return self._session.query(Scheduler)\
            .filter(Scheduler.affiliation.has(Affiliation.id == affiliation_id)).one_or_none()
    
    def get_work_category(self, id_: str) -> WorkCategory:
        return self._session.query(WorkCategory).get(id_)
    
    def get_month_year_setting(self, month_year_setting_id) -> MonthlySetting:
        return self._session.query(MonthlySetting)\
            .filter(MonthlySetting.id == month_year_setting_id).one_or_none()
    
    def get_requests_of_id(self, id_: str) -> [Request]:
        return self._session.query(Request).filter(Request.id == id_).all()
