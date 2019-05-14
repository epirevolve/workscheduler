# -*- coding: utf-8 -*-

import numpy as np

from . import ScheduleQuery
from . import SchedulerQuery


class Day:
    def __init__(self, day: int, name: str):
        self.day = day
        self.name = name
        

class Total:
    def __init__(self, day: int, count: int, state: str):
        self.day = day
        self.count = count
        self.state = state


class ScheduleFacade:
    def __init__(self, session):
        self._session = session
    
    def get_schedule(self, affiliation_id: str, month: int, year: int):
        scheduler = SchedulerQuery(self._session).get_scheduler_of_affiliation_id(affiliation_id)
        if not scheduler:
            raise Exception('no scheduler is made')
        work_categories = {x.id: x for x in scheduler.work_categories}
        monthly_setting = scheduler.monthly_setting(month, year)
        fixed_schedules = {y.id: y for x in monthly_setting.days for y in x.fixed_schedules}
        schedules = ScheduleQuery(self._session).get_schedules_of_affiliation_year_month(
            affiliation_id, month, year)
        
        if not schedules:
            return [], [], schedules.is_published
            
        def get_total(work_category, day_setting, operator_schedules):
            participant_count = len([x for x in operator_schedules if x.work_category_id == work_category.id])
            max_require = work_category.holiday_max if day_setting.is_holiday else work_category.week_day_max
            day_detail = list(filter(lambda x: x.work_category == work_category, day_setting.details))[0]
            state = 'excess' if participant_count > max_require else\
                'over' if participant_count > day_detail.require else\
                'under' if participant_count < day_detail.require else ''
            return Total(day_setting.day, participant_count, state)
        
        def get_name(work_id: str):
            return work_categories[work_id].title if work_id in work_categories\
                else fixed_schedules[work_id].title if work_id in fixed_schedules\
                else work_id
        
        transpose = np.array([x.day_work_categories for x in schedules.components]).T
        totals = [
            {
                'workCategory': x,
                'totals': [get_total(x, y, z) for y, z in zip(monthly_setting.days, transpose)]
            } for x in scheduler.work_categories]

        schedules_components = [
            {
                'operator': x.operator,
                'schedule': [Day(y.day, get_name(y.work_category_id)) for y in x.day_work_categories],
                'totals': [
                    {
                        'workCategory': y,
                        'total': len([z for z in x.day_work_categories if z.work_category_id == y.id])
                     } for y in scheduler.work_categories]
            } for x in schedules.components]
        
        return schedules_components, totals, schedules.is_published
