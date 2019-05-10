# -*- coding: utf-8 -*-

from workscheduler.domains.models.schedule import ScheduleComponent
from workscheduler.domains.models.schedule import Schedule

from . import ScheduleQuery


class ScheduleCommand:
    def __init__(self, session):
        self._session = session
    
    def append_new_schedule(self, affiliation_id: str, month: int, year: int,
                            schedules):
        self.remove_schedule(affiliation_id, month, year)
        components = []
        for operator, schedule in schedules:
            components.append(ScheduleComponent.new_schedule_component(operator, schedule))
        schedule = Schedule.new_schedule(affiliation_id, month, year, components)
        self._session.add(schedule)
    
    def remove_schedule(self, affiliation_id: str, month: int, year: int):
        schedules = ScheduleQuery(self._session).get_schedules_of_affiliation_year_month(
            affiliation_id, month, year)
        for schedule in schedules:
            self._session.delete(schedule)
