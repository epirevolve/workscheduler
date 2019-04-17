# -*- coding: utf-8 -*-

from workscheduler.domains.models.scheduler import Scheduler
from workscheduler.domains.models.scheduler import FixedSchedule
from workscheduler.domains.models.scheduler import WorkCategory
from workscheduler.domains.models.scheduler import MonthlySetting
from workscheduler.domains.models.scheduler import YearlySetting
from workscheduler.domains.models.scheduler import Request
from workscheduler.domains.models.scheduler import Vacation
from workscheduler.domains.models.user import Affiliation


class SchedulerQuery:
    def __init__(self, session):
        self._session = session
        
    def get_scheduler(self, id_: str) -> Scheduler:
        return self._session.query(Scheduler).get(id_)
    
    def get_scheduler_of_affiliation_id(self, affiliation_id: str) -> Scheduler:
        return self._session.query(Scheduler)\
            .filter(Scheduler.affiliation.has(Affiliation.id == affiliation_id)).one_or_none()
    
    def get_scheduler_of_monthly_setting_id(self, monthly_setting_id: str) -> Scheduler:
        return self._session.query(Scheduler)\
            .filter(Scheduler.monthly_settings.any(MonthlySetting.id == monthly_setting_id)).one_or_none()
    
    def get_work_category(self, work_category_id: str) -> WorkCategory:
        return self._session.query(WorkCategory).get(work_category_id)
    
    def get_fixed_schedules_of_id(self, fixed_schedule_id: str) -> [FixedSchedule]:
        return self._session.query(FixedSchedule)\
            .filter(FixedSchedule.id == fixed_schedule_id).all()
    
    def get_monthly_setting(self, monthly_setting_id) -> MonthlySetting:
        return self._session.query(MonthlySetting)\
            .filter(MonthlySetting.id == monthly_setting_id).one_or_none()
    
    def get_vacation(self, vacation_id: str) -> Vacation:
        return self._session.query(Vacation)\
            .filter(Vacation.id == vacation_id).one_or_none()
    
    def get_yearly_setting(self, yearly_setting_id: str) -> YearlySetting:
        return self._session.query(YearlySetting) \
            .filter(YearlySetting.id == yearly_setting_id).one_or_none()
    
    def get_requests_of_id(self, request_id: str) -> [Request]:
        return self._session.query(Request).filter(Request.id == request_id).all()
