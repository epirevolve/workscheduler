# -*- coding: utf-8 -*-

from . import ScheduleCommand
from . import SchedulerCommand


class SchedulerFacade:
    def __init__(self, session):
        self._session = session

    def launch(self, team_id: str, month: int, year: int):
        try:
            schedule = SchedulerCommand(self._session).create_schedules(team_id, month, year)
            ScheduleCommand(self._session).append_new_schedule(team_id, month, year, schedule)
            self._session.commit()
        finally:
            pass
