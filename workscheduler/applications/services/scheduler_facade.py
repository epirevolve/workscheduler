# -*- coding: utf-8 -*-

from datetime import date

from workscheduler.applications.services import (
    AffiliationQuery, SchedulerQuery
)
from workscheduler.domains.models.scheduler import Calendar


class SchedulerFacade:
    def __init__(self, session):
        self._session = session
    
    def get_category_compensated_calendar(self, affiliation_id: str, schedule_of: date):
        affiliation = AffiliationQuery(self._session).get_affiliation(affiliation_id)
        work_categories = SchedulerQuery(self._session).get_option_of_affiliation_id(affiliation_id).work_categories
        calendar = SchedulerQuery(self._session).get_calendar(affiliation_id, schedule_of.year, schedule_of.month)
        if calendar:
            calendar.update_categories(work_categories)
        else:
            calendar = Calendar.new_month_year(
                affiliation, work_categories, schedule_of.year, schedule_of.month, [])
        setattr(calendar, 'schedule_of', schedule_of)
        return calendar
