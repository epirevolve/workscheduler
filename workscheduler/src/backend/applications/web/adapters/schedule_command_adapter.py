# -*- coding: utf-8 -*-

from applications.services import ScheduleCommand
from applications.services.domain_orm import to_schedule


class ScheduleCommandAdapter:
    def __init__(self, session):
        self._session = session

    def update_schedule(self, data: dict):
        schedule = to_schedule(data)
        return ScheduleCommand(self._session).update_schedule(schedule)

    def publish_schedule(self, data: dict):
        schedule = self.update_schedule(data)
        schedule = ScheduleCommand(self._session).publish_schedule(schedule)
        return schedule

    def withdraw_schedule(self, data: dict):
        schedule = self.update_schedule(data)
        schedule = ScheduleCommand(self._session).withdraw_schedule(schedule)
        return schedule
