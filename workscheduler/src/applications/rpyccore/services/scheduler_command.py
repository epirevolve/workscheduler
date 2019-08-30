# -*- coding: utf-8 -*-

from domains.models.scheduler import History
from domains.models.scheduler.history import ProcessStatus

from applications.web.backend.services import UserQuery
from applications.web.backend.services import OperatorQuery
from applications.web.backend.services import SchedulerQuery
from applications.web.backend.services import ScheduleQuery


class SchedulerCommand:
    def __init__(self, session):
        self._session = session

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
