# -*- coding: utf-8 -*-

from domains.models.scheduler import History

from . import UserQuery
from . import OperatorQuery
from . import SchedulerQuery
from . import ScheduleCommand
from . import ScheduleQuery
from . import SchedulerCommand


class SchedulerFacade:
    def __init__(self, session):
        self._session = session

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

    def launch(self, team_id: str, month: int, year: int):
        try:
            team = UserQuery(self._session).get_team(team_id)
            history = self._append_new_history(team, month, year)
            pipe = self._update_launching_status(history)
            schedule, adaptability = SchedulerCommand(self._session).create_schedules(team_id, month, year)
            ScheduleCommand(self._session).append_new_schedule(team_id, month, year, schedule)
            history.adaptability = adaptability
            self._session.commit()
        finally:
            pass
