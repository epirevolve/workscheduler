# -*- coding: utf-8 -*-

from collections import namedtuple

from . import ScheduleQuery
from . import SchedulerQuery


class ScheduleFacade:
    def __init__(self, session):
        self._session = session
    
    def get_schedule(self, affiliation_id: str, year: int, month: int):
        scheduler = SchedulerQuery(self._session).get_scheduler_of_affiliation_id(affiliation_id)
        work_categories = {x.id: x for x in scheduler.work_categories}
        schedules = ScheduleQuery(self._session).get_schedules_of_affiliation_year_month(
            affiliation_id, year, month)
        Day = namedtuple('Day', ('day', 'name'))
        
        def get_category_name(category: str):
            return work_categories[category].title if category in work_categories else category
        return [[Day(y.day, get_category_name(y.work_category)) for y in x.day_work_categories]
                for x in schedules]
