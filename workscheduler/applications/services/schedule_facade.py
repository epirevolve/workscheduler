# -*- coding: utf-8 -*-

from . import ScheduleQuery
from . import SchedulerQuery


class Day:
    def __init__(self, day: int, name: str):
        self.day = day
        self.name = name


class ScheduleFacade:
    def __init__(self, session):
        self._session = session
    
    def get_schedule(self, affiliation_id: str, year: int, month: int):
        scheduler = SchedulerQuery(self._session).get_scheduler_of_affiliation_id(affiliation_id)
        if not scheduler:
            raise Exception('no scheduler is made')
        work_categories = {x.id: x for x in scheduler.work_categories}
        schedules = ScheduleQuery(self._session).get_schedules_of_affiliation_year_month(
            affiliation_id, year, month)
        
        def get_category_name(category: str):
            return work_categories[category].title if category in work_categories else category
        return [{'operator': x.operator,
                 'schedule': [Day(y.day, get_category_name(y.work_category)) for y in x.day_work_categories]}
                for x in schedules]
