# -*- coding: utf-8 -*-

from domains.models.scheduler import Scheduler
from domains.models.scheduler import FixedSchedule
from domains.models.scheduler import WorkCategory
from domains.models.scheduler import MonthlySetting
from domains.models.scheduler import Request
from domains.models.scheduler import Vacation
from domains.models.scheduler import History
from domains.models.user import Team


class SchedulerQuery:
    def __init__(self, session):
        self._session = session
        
    def get_scheduler(self, id_: str) -> Scheduler:
        return self._session.query(Scheduler).get(id_)
    
    def get_scheduler_of_team_id(self, team_id: str) -> Scheduler:
        return self._session.query(Scheduler)\
            .filter(Scheduler.team.has(Team.id == team_id)).one_or_none()
    
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
    
    def get_requests_of_id(self, request_id: str) -> [Request]:
        return self._session.query(Request).filter(Request.id == request_id).all()

    def get_current_runners(self) -> [Scheduler]:
        return self._session.query(Scheduler).filter(Scheduler.is_launching).all()

    def get_launch_histories(self) -> [History]:
        return self._session.query(History).all()
