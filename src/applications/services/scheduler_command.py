# -*- coding: utf-8 -*-

from datetime import datetime

from applications.errors import AlreadyLaunchError
from domains.models.scheduler import Scheduler
from domains.models.scheduler import MonthlySetting
from domains.models.scheduler import Vacation
from . import TeamQuery
from . import OperatorQuery
from . import SchedulerQuery
from . import ScheduleCommand


class SchedulerCommand:
    def __init__(self, session):
        self._session = session
    
    def update_monthly_setting(self, monthly_setting: MonthlySetting):
        self._session.merge(monthly_setting)
        return monthly_setting
    
    def public_monthly_setting(self, id: str):
        monthly_setting = SchedulerQuery(self._session).get_monthly_setting(id)
        monthly_setting.is_published = True
        return monthly_setting
        
    def append_scheduler(self, team_id: str):
        team = TeamQuery(self._session).get_team(team_id)
        scheduler = Scheduler.new(team)
        self._session.add(scheduler)
        return scheduler

    def update_basic_setting(self, scheduler: Scheduler):
        self._session.merge(scheduler)
        return scheduler
    
    def append_vacation(self, title: str, on_from: datetime,
                        on_to: datetime, days: int):
        vacation = Vacation.new(title, on_from, on_to, days)
        self._session.add(vacation)
        return vacation
    
    def update_vacation(self, id_: str, title: str,
                        on_from: datetime, on_to: datetime, days: int):
        vacation = SchedulerQuery(self._session).get_vacation(id_)
        vacation.title = title
        vacation.on_from = on_from
        vacation.on_to = on_to
        vacation.days = days
        return vacation
        
    def update_yearly_setting(self, scheduler_id: str, year: int, vacations: []):
        scheduler = SchedulerQuery(self._session).get_scheduler(scheduler_id)
        yearly_setting = scheduler.yearly_setting(year)
        vacation_ids = [x.id for x in yearly_setting.vacations]
        yearly_setting.vacations = [
            self.append_vacation(x.title, x.on_from, x.on_to, x.days) if x.id not in vacation_ids
            else self.update_vacation(x.id, x.title, x.on_from, x.on_to, x.days) for x in vacations]
    
    def launch(self, team_id: str, month: int, year: int):
        operators = OperatorQuery(self._session).get_active_operators_of_team_id(team_id)
        scheduler = SchedulerQuery(self._session).get_scheduler_of_team_id(team_id)
        if scheduler.is_launching:
            raise AlreadyLaunchError()
        try:
            scheduler.is_launching = True
            self._session.commit()
            schedule = scheduler.run(month, year, operators)
            ScheduleCommand(self._session).append_new_schedule(team_id, month, year,
                                                               schedule)
        finally:
            scheduler.is_launching = False
            self._session.commit()
