# -*- coding: utf-8 -*-

from datetime import date

from workscheduler.domains.models.scheduler import MonthYearSetting
from . import SchedulerQuery


class SchedulerFacade:
    def __init__(self, session):
        self._session = session
    
    def get_calendar_builded_scheduler(self, affiliation_id: str, schedule_of: date):
        scheduler = SchedulerQuery(self._session).get_scheduler_of_affiliation_id(affiliation_id)
        work_categories = scheduler.work_categories
        month_year_setting = list(filter(lambda x: x.year == schedule_of.year and x.month == schedule_of.month,
                                         scheduler.month_year_settings))
        if not month_year_setting:
            month_year_setting = MonthYearSetting.new_month_year(
                work_categories, schedule_of.year, schedule_of.month)
            scheduler.month_year_settings.append(month_year_setting)
            self._session.commit()
        return scheduler
