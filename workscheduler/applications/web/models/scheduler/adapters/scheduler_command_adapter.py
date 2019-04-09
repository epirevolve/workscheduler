# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date

from collections import namedtuple

from workscheduler.applications.services import SchedulerCommand
from workscheduler.applications.web.util.functions.converter import to_time
from workscheduler.applications.web.util.functions.converter import to_date
from workscheduler.applications.web.util.functions.extractor import list_id


class SchedulerCommandAdapter:
    def __init__(self, session):
        self._session = session
    
    def update_monthly_setting(self, data: dict):
        id_ = data.get('id')
        days = data.get('days')
        holidays = data.get('holidays')
        fixed_schedules = data.get('fixed_schedules')
        return SchedulerCommand(self._session).update_monthly_setting(
            id_, days, holidays, fixed_schedules
        )
    
    def public_monthly_setting(self, monthly_setting_id: str):
        return SchedulerCommand(self._session).public_monthly_setting(monthly_setting_id)
    
    def append_work_category(self, data: dict):
        return SchedulerCommand(self._session).append_work_category(
            data.get('title'), to_time(data.get('at_from')), to_time(data.get('at_to')),
            data.get('week_day_require'), data.get('week_day_max'), data.get('holiday_require'),
            data.get('holiday_max'), data.get('rest_days'), data.get('max_times'),
            list_id(data.get('essential_skills')), list_id(data.get('essential_operators')),
            list_id(data.get('impossible_operators'))
        )
    
    def update_work_category(self, data: dict):
        return SchedulerCommand(self._session).update_work_category(
            data.get('id'), data.get('title'), to_time(data.get('at_from')),
            to_time(data.get('at_to')), data.get('week_day_require'), data.get('week_day_max'),
            data.get('holiday_require'), data.get('holiday_max'), data.get('rest_days'),
            data.get('max_times'), list_id(data.get('essential_skills')),
            list_id(data.get('essential_operators')), list_id(data.get('impossible_operators'))
        )
    
    def update_basic_setting(self, data: dict):
        work_category_ids = [self.append_work_category(x).id if x.get('id').startswith('tmp')
                             else self.update_work_category(x).id
                             for x in data.get('work_categories')]
        self._session.flush()
        return SchedulerCommand(self._session).update_basic_setting(
            data.get('id'), data.get('affiliation').get('id'), data.get('certified_skill'),
            data.get('not_certified_skill'), work_category_ids
        )
    
    def update_yearly_setting(self, scheduler_id: str, data: dict):
        Vacation = namedtuple('Vacation', ('id', 'title', 'on_from', 'on_to', 'days'))
        vacations = [Vacation(
            x.get('id'), x.get('title'), to_date(x.get('on_from')),
            to_date(x.get('on_to')), x.get('days')) for x in data.get('vacations')]
        return SchedulerCommand(self._session).update_yearly_setting(
            scheduler_id, data.get('year'), vacations)
    
    def launch(self, affiliation_id: str, schedule_of: str):
        if schedule_of and not isinstance(schedule_of, date):
            schedule_of = datetime.strptime(schedule_of, '%Y-%m').date()
        return SchedulerCommand(self._session).launch(affiliation_id, schedule_of)
