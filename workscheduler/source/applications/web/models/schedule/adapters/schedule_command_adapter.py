# -*- coding: utf-8 -*-

from applications.services import ScheduleCommand

from applications.services.json_orm import to_schedule


class ScheduleCommandAdapter:
    def __init__(self, session):
        self._session = session

    def update_schedule(self, data: dict):
        schedule = to_schedule(data)
        return ScheduleCommand(self._session).update_schedule(schedule)

    def public_schedule(self, data: dict):
        self.update_schedule(data)
        return True
