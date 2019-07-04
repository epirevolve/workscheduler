# -*- coding: utf-8 -*-

from . import ScheduleQuery
from . import SchedulerQuery


class Day:
    def __init__(self, day: int, name: str):
        self.day = day
        self.name = name
        

class Total:
    def __init__(self, day: int, count: int):
        self.day = day
        self.count = count


class ScheduleFacade:
    def __init__(self, session):
        self._session = session
    
    def get_schedule(self, team_id: str, month: int, year: int):
        scheduler = SchedulerQuery(self._session).get_scheduler_of_team_id(team_id)
        if not scheduler:
            raise Exception('no scheduler is made')
        monthly_setting = scheduler.monthly_setting(month, year)
        schedules = ScheduleQuery(self._session).get_schedules_of_team_year_month(
            team_id, month, year)
        return monthly_setting.days, schedules
