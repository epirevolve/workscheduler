# -*- coding: utf-8 -*-

import numpy as np

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
        
        if not schedules:
            return [], []
        
        def get_category_name(work_category_id: str):
            return work_categories[work_category_id].title if work_category_id in work_categories else work_category_id

        totals = [
            {
                'workCategory': x,
                'totals': [len([z for z in y if z.work_category_id == x.id])
                           for y in np.array([x.day_work_categories for x in schedules]).T]
            } for x in scheduler.work_categories]

        schedules = [
            {
                'operator': x.operator,
                'schedule': [Day(y.day, get_category_name(y.work_category_id)) for y in x.day_work_categories],
                'totals': [
                    {
                        'workCategory': y,
                        'total': len([z for z in x.day_work_categories if z.work_category_id == y.id])
                     } for y in scheduler.work_categories]
            } for x in schedules]
        
        return schedules, totals
