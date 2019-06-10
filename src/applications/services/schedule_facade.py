# -*- coding: utf-8 -*-

import numpy as np

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
        work_categories = {x.id: x for x in scheduler.work_categories}
        monthly_setting = scheduler.monthly_setting(month, year)
        fixed_schedules = {y.id: y for x in monthly_setting.days for y in x.fixed_schedules}
        schedules = ScheduleQuery(self._session).get_schedules_of_team_year_month(
            team_id, month, year)
        
        if not schedules:
            return [], [], [], False
            
        def get_total(work_category, day_setting, operator_schedules):
            participant_count = len([x for x in operator_schedules if x.work_category_id == work_category.id])
            return Total(day_setting.day, participant_count)
        
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
                + [{'workCategory': '-', 'total': len([z for z in x.day_work_categories if z.work_category_id == '-'])},
                   {'workCategory': '', 'total': len([z for z in x.day_work_categories if z.work_category_id == ' '])}]
            } for x in schedules.components]
        
        return monthly_setting.days, schedules_components, totals, schedules.is_published
