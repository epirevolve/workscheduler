# -*- coding: utf-8 -*-

from datetime import datetime

from applications.errors import AlreadyLaunchError
from domains.models.scheduler import History
from domains.models.scheduler import Scheduler
from domains.models.scheduler import MonthlySetting
from domains.models.scheduler import Vacation
from . import TeamQuery
from . import OperatorQuery
from . import SchedulerQuery
from . import ScheduleCommand
from . import ScheduleQuery


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

    def turn_on_scheduler_launching(self, scheduler):
        scheduler.is_launching = True
        self._session.commit()

    def turn_off_scheduler_launching(self, scheduler):
        scheduler.is_launching = False
        self._session.commit()

    def append_new_history(self, team, month, year):
        history = History.new(team, month, year)
        self._session.add(history)
        self._session.commit()
        return history

    def update_launching_status(self, history):
        while 1:
            history.process_status = yield
            self._session.commit()

    @staticmethod
    def _get_last_month(month, year):
        return month - 1 if month > 1 else 12, year if month > 1 else year - 1

    def launch(self, team_id: str, month: int, year: int):
        operators = OperatorQuery(self._session).get_active_operators_of_team_id(team_id)
        scheduler = SchedulerQuery(self._session).get_scheduler_of_team_id(team_id)
        last_month_schedules = ScheduleQuery(self._session).get_schedules_of_team_year_month(
            team_id, *self._get_last_month(month, year))
        team = TeamQuery(self._session).get_team(team_id)
        # if scheduler.is_launching:
        #     raise AlreadyLaunchError()
        try:
            self.turn_on_scheduler_launching(scheduler)
            history = self.append_new_history(team, month, year)
            pipe = self.update_launching_status(history)
            schedule, adaptability = scheduler.run(last_month_schedules, month, year, operators, pipe)
            ScheduleCommand(self._session).append_new_schedule(team_id, month, year, schedule)
            history.adaptability = adaptability
        finally:
            self.turn_off_scheduler_launching(scheduler)

    def terminate(self, team_id: str, mont: int, year: int):
        pass
