# -*- coding: utf-8 -*-

from datetime import date

from workscheduler.domains.models.scheduler import Calendar
from . import AffiliationQuery
from . import SchedulerQuery


class SchedulerFacade:
    def __init__(self, session):
        self._session = session
    
    def get_category_compensated_calendar(self, affiliation_id: str, schedule_of: date):
        affiliation = AffiliationQuery(self._session).get_affiliation(affiliation_id)
        work_categories = SchedulerQuery(self._session).get_option_of_affiliation_id(affiliation_id).work_categories
        calendar = SchedulerQuery(self._session).get_calendar_of_affiliation_id_year_month(
            affiliation_id, schedule_of.year, schedule_of.month)
        exist = False
        if calendar:
            calendar.update_categories(work_categories)
            exist = True
        else:
            calendar = Calendar.new_month_year(
                affiliation, work_categories, schedule_of.year, schedule_of.month, [])
        return calendar, exist
