# -*- coding: utf-8 -*-

from collections import namedtuple

from workscheduler.applications.services import SchedulerCommand
from workscheduler.applications.web.util.functions.converter import to_time
from workscheduler.applications.web.util.functions.converter import to_date
from workscheduler.applications.web.util.functions.extractor import list_id


class SchedulerCommandAdapter:
    def __init__(self, session):
        self._session = session

    def update_fixed_schedules(self, id_, data_fixed_schedules: []):
        FixedSchedule = namedtuple('FixedSchedule', ('id', 'title', 'on_from', 'on_to',
                                                     'at_from', 'at_to', 'participants'))
        fixed_schedules = [FixedSchedule(x.get('id'), x.get('title'), to_date(x.get('on_from')),
                                         to_date(x.get('on_to')), to_time(x.get('at_from')), to_time(x.get('at_to')),
                                         [y.get('id') for y in x.get('participants')])
                           for x in data_fixed_schedules]
        return SchedulerCommand(self._session).update_fixed_schedules(
            id_, fixed_schedules)
    
    def update_monthly_setting(self, data: dict):
        id_ = data.get('id')
        DayDetail = namedtuple('DayDetail', ('id', 'require'))
        Day = namedtuple('Day', ('id', 'is_holiday', 'details'))
        days = [Day(x.get('id'), x.get('is_holiday'),
                    [DayDetail(y.get('id'), y.get('require'))
                     for y in x.get('details')]) for x in data.get('days')]
        holidays = data.get('holidays')
        return SchedulerCommand(self._session).update_monthly_setting(
            id_, days, holidays)
    
    def public_monthly_setting(self, monthly_setting_id: str):
        return SchedulerCommand(self._session).public_monthly_setting(monthly_setting_id)
    
    def append_work_category(self, data: dict):
        return SchedulerCommand(self._session).append_work_category(
            data.get('title'), to_time(data.get('at_from')), to_time(data.get('at_to')),
            data.get('week_day_require'), data.get('week_day_max'), data.get('holiday_require'),
            data.get('holiday_max'), data.get('day_offs'), data.get('max_times'),
            list_id(data.get('week_day_operators')), list_id(data.get('holiday_operators')),
            list_id(data.get('essential_skills')), list_id(data.get('exclusive_operators')),
            list_id(data.get('impossible_operators'))
        )
    
    def update_work_category(self, data: dict):
        return SchedulerCommand(self._session).update_work_category(
            data.get('id'), data.get('title'), to_time(data.get('at_from')),
            to_time(data.get('at_to')), data.get('week_day_require'), data.get('week_day_max'),
            data.get('holiday_require'), data.get('holiday_max'), data.get('day_offs'),
            data.get('max_times'), list_id(data.get('week_day_operators')), list_id(data.get('holiday_operators')),
            list_id(data.get('essential_skills')), list_id(data.get('exclusive_operators')),
            list_id(data.get('impossible_operators'))
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
    
    def launch(self, affiliation_id: str, month: str, year: str):
        return SchedulerCommand(self._session).launch(affiliation_id, int(month), int(year))
