# -*- coding: utf-8 -*-

from applications.services import UserQuery
from applications.services import OperatorQuery
from applications.services import SchedulerQuery
from applications.services import ScheduleQuery

from domains.models.scheduler import History
from domains.models.scheduler.history import ProcessStatus
from domains.models.scheduler import Scheduler
from domains.models.scheduler import MonthlySetting
from domains.models.scheduler import Vacation


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

    def _append_new_history(self, team, month, year):
        history = History.new(team, month, year)
        self._session.add(history)
        self._session.commit()
        return history

    def _check_proceed_status(self, history: History):
        def _inner(status: ProcessStatus):
            self._session.refresh(history)
            if history.process_status == ProcessStatus.ABORT:
                return False
            history.process_status = status
            self._session.commit()
            return True
        return _inner

    @staticmethod
    def _get_last_month(month, year):
        return month - 1 if month > 1 else 12, year if month > 1 else year - 1

    def create_schedules(self, team_id: str, month: int, year: int):
        team = UserQuery(self._session).get_team(team_id)
        history = self._append_new_history(team, month, year)
        pipe = self._check_proceed_status(history)
        operators = OperatorQuery(self._session).get_active_operators_of_team_id(team_id)
        scheduler = SchedulerQuery(self._session).get_scheduler_of_team_id(team_id)
        last_schedules = ScheduleQuery(self._session).get_schedules_of_team_year_month(
            team_id, *self._get_last_month(month, year))
        schedules, adaptability = scheduler.run(last_schedules, month, year, operators, pipe)
        history.adaptability = adaptability
        return schedules

    def terminate(self, team_id):
        runners = [x for x in SchedulerQuery(self._session).get_current_runners() if x.team.id == team_id]
        for runner in runners:
            runner.process_status = ProcessStatus.ABORT
