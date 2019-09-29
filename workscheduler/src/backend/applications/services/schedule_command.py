# -*- coding: utf-8 -*-

from domains.models.schedule import ScheduleComponent
from domains.models.schedule import Schedule

from applications.services import ScheduleQuery


class ScheduleCommand:
    def __init__(self, session):
        self._session = session

    def remove_schedule(self, team_id: str, month: int, year: int):
        schedule = ScheduleQuery(self._session).get_schedules_of_team_year_month(
            team_id, month, year)
        if not schedule:
            return
        self._session.delete(schedule)

    def append_new_schedule(self, team_id: str, month: int, year: int,
                            schedule_components: []):
        self.remove_schedule(team_id, month, year)
        components = []
        for operator, schedule in schedule_components:
            components.append(ScheduleComponent.new(operator, schedule))
        schedule = Schedule.new(team_id, month, year, components)
        self._session.add(schedule)

    def update_schedule(self, schedule: Schedule):
        self._session.merge(schedule)
        return schedule

    def publish_schedule(self, schedule: Schedule):
        schedule.is_published = True
        self._session.merge(schedule)
        return schedule

    def withdraw_schedule(self, schedule: Schedule):
        schedule.is_published = False
        self._session.merge(schedule)
        return schedule
