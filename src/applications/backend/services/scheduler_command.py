# -*- coding: utf-8 -*-

from datetime import datetime

from utils.datetime import is_overlap
from utils.date import get_next_day

from backend.errors import AlreadyLaunchError
from backend.errors import CalendarError
from backend.errors import RequestError

from domains.models.scheduler import History
from domains.models.scheduler import Scheduler
from domains.models.scheduler import MonthlySetting
from domains.models.scheduler import Vacation
from domains.models.scheduler import Request

from . import UserQuery
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
        team = UserQuery(self._session).get_team(team_id)
        scheduler = Scheduler.new(team)
        self._session.add(scheduler)
        return scheduler

    def update_basic_setting(self, scheduler: Scheduler):
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
        team = UserQuery(self._session).get_team(team_id)
        # if scheduler.is_launching:
        #     raise AlreadyLaunchError()
        try:
            self.turn_on_scheduler_launching(scheduler)
            history = self.append_new_history(team, month, year)
            pipe = self.update_launching_status(history)
            schedule, adaptability = scheduler.run(last_month_schedules, month, year, operators, pipe)
            ScheduleCommand(self._session).append_new_schedule(team_id, month, year, schedule)
            history.adaptability = adaptability
            self._session.commit()
        finally:
            scheduler = SchedulerQuery(self._session).get_scheduler_of_team_id(team_id)
            self.turn_off_scheduler_launching(scheduler)

    def terminate(self, team_id: str, mont: int, year: int):
        pass

    @staticmethod
    def _request_validity(operator_id, monthly_setting, new_request):
        for day in monthly_setting.days:
            for request in filter(lambda x: x.operator.id == operator_id, day.requests):
                if is_overlap(new_request.at_from, new_request.at_to,
                              request.at_from, request.at_to):
                    raise RequestError()

    def _add_request(self, scheduler_id: str, request: Request):
        scheduler = SchedulerQuery(self._session).get_scheduler(scheduler_id)
        search_date = request.at_from
        while search_date <= request.at_to:
            monthly_setting = scheduler.monthly_setting(search_date.month, search_date.year)
            self._request_validity(request.operator.id, monthly_setting, request)
            if not monthly_setting.is_published:
                raise CalendarError()
            while search_date.month == monthly_setting.month and search_date <= request.at_to:
                monthly_setting.days[search_date.day - 1].requests.append(request)
                search_date = get_next_day(search_date)

    def append_my_request(self, user_id: str, scheduler_id: str,
                          title: str, note: str, at_from: datetime, at_to: datetime) -> Request:
        operator = OperatorQuery(self._session).get_operator_of_user_id(user_id)
        request = Request.new(title, note, at_from,
                              at_to, operator)
        self._add_request(scheduler_id, request)
        return request

    def update_my_request(self, scheduler_id: str, id_: str, title: str,
                          note: str, at_from: datetime, at_to: datetime) -> Request:
        request = SchedulerQuery(self._session).get_requests_of_id(id_)
        operator_id = request.operator.id
        self._session.delete(request)
        self._session.flush()
        request = Request(id_, title, note,
                          at_from, at_to, OperatorQuery(self._session).get_operator(operator_id))
        self._add_request(scheduler_id, request)
        return request

    def remove_my_request(self, id: str):
        request = SchedulerQuery(self._session).get_requests_of_id(id)
        self._session.delete(request)
