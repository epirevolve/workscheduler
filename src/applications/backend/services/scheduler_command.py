# -*- coding: utf-8 -*-

from applications.backend.errors import AlreadyLaunchError
from applications.backend.errors import CalendarError
from applications.backend.errors import RequestError

from domains.models.scheduler import History
from domains.models.scheduler import Scheduler
from domains.models.scheduler import MonthlySetting
from domains.models.scheduler import Vacation

from . import UserQuery
from . import OperatorQuery
from . import SchedulerQuery
from . import ScheduleQuery


class SchedulerCommand:
    def __init__(self, session):
        self._session = session

    def append_scheduler(self, team_id: str):
        team = UserQuery(self._session).get_team(team_id)
        scheduler = Scheduler.new(team)
        self._session.add(scheduler)
        return scheduler

    def save_scheduler(self, scheduler: Scheduler):
        self._session.merge(scheduler)
        return scheduler

    def save_monthly_setting(self, monthly_setting: MonthlySetting):
        self._session.merge(monthly_setting)
        return monthly_setting
    
    def public_monthly_setting(self, monthly_setting: MonthlySetting):
        monthly_setting.is_published = True
        self.save_monthly_setting(monthly_setting)
        return monthly_setting

    def remove_request(self, id: str):
        request = SchedulerQuery(self._session).get_requests_of_id(id)
        self._session.delete(request)

    def save_basic_setting(self, scheduler: Scheduler):
        self._session.merge(scheduler)
        return scheduler

    def append_vacation(self, team_id: str, vacation: Vacation):
        scheduler = SchedulerQuery(self._session).get_scheduler_of_team_id(team_id)
        scheduler.vacations.append(vacation)
        self._session.merge(scheduler)
        return vacation
        
    def update_vacation(self, vacation: Vacation):
        self._session.merge(vacation)
        return vacation

    def turn_on_scheduler_launching(self, scheduler: Scheduler):
        scheduler.is_launching = True
        self._session.commit()

    def turn_off_scheduler_launching(self, scheduler: Scheduler):
        scheduler.is_launching = False
        self._session.commit()

    def _append_new_history(self, team, month, year):
        history = History.new(team, month, year)
        self._session.add(history)
        self._session.commit()
        return history

    def _update_launching_status(self, history):
        while 1:
            history.process_status = yield
            self._session.commit()

    @staticmethod
    def _get_last_month(month, year):
        return month - 1 if month > 1 else 12, year if month > 1 else year - 1

    def create_schedules(self, team_id: str, month: int, year: int):
        operators = OperatorQuery(self._session).get_active_operators_of_team_id(team_id)
        scheduler = SchedulerQuery(self._session).get_scheduler_of_team_id(team_id)
        last_month_schedules = ScheduleQuery(self._session).get_schedules_of_team_year_month(
            team_id, *self._get_last_month(month, year))
        team = UserQuery(self._session).get_team(team_id)
        # if scheduler.is_launching:
        #     raise AlreadyLaunchError()
        history = self._append_new_history(team, month, year)
        pipe = self._update_launching_status(history)
        return scheduler.run(last_month_schedules, month, year, operators, pipe)

    def terminate(self, team_id: str, mont: int, year: int):
        pass
