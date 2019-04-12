# -*- coding: utf-8 -*-

from workscheduler.domains.models.schedule import Schedule
from workscheduler.domains.models.operator import Operator

from . import ScheduleQuery


class ScheduleCommand:
    def __init__(self, session):
        self._session = session
    
    def append_new_schedule(self, affiliation_id: str, year: int, month: int,
                            operators: [Operator], schedules):
        self.remove_schedule(affiliation_id, year, month)
        for operator, schedule in zip(operators, schedules):
            work_schedule = Schedule.new_schedule(operator, affiliation_id, year, month, schedule)
            self._session.add(work_schedule)
    
    def remove_schedule(self, affiliation_id: str, year: int, month: int):
        schedules = ScheduleQuery(self._session).get_schedules_of_affiliation_year_month(
            affiliation_id, year, month)
        for schedule in schedules:
            self._session.delete(schedule)
