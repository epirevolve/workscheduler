# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import date
from datetime import time

from mypackages.utils.datetime import is_overlap
from mypackages.utils.date import get_next_day

from workscheduler.domains.models.scheduler import Scheduler
from workscheduler.domains.models.scheduler import Request
from workscheduler.domains.models.scheduler import WorkCategory
from workscheduler.domains.models.scheduler import FixedSchedule
from workscheduler.domains.models.scheduler import DaySetting
from ..errors import CalendarError
from ..errors import RequestError
from . import AffiliationQuery
from . import OperatorQuery
from . import SkillQuery
from . import SchedulerQuery


class SchedulerCommand:
    def __init__(self, session):
        self._session = session

    def _request_validity(self, operator_id, month_year_setting,
                          at_from, at_to):
        for day in month_year_setting.days:
            for request in filter(lambda x: x.operator.id == operator_id, day.requests):
                if is_overlap(at_from, at_to, request.at_from, request.at_to):
                    raise RequestError()

    def append_my_request(self, user_id: str, scheduler_id: str,
                          title: str, note: str, at_from: datetime, at_to: datetime) -> Request:
        scheduler = SchedulerQuery(self._session).get_scheduler(scheduler_id)
        
        operator = OperatorQuery(self._session).get_operator_of_user_id(user_id)
        request = Request.new_request(title, note, at_from,
                                      at_to, operator)
        search_date = at_from
        while search_date <= at_to:
            month_year_setting = scheduler.month_year_setting(search_date.month, search_date.year)
            self._request_validity(operator.id, month_year_setting,
                                   at_from, at_to)
            if not month_year_setting.is_published:
                raise CalendarError()
            while search_date.month == month_year_setting.month and search_date <= at_to:
                month_year_setting.days[search_date.day - 1].requests.append(request)
                search_date = get_next_day(search_date)
            search_date = get_next_day(search_date)
        return request
    
    def update_monthly_setting(self, id_: str, days: [], holidays: int,
                               fixed_schedules: [], is_published: bool, is_fixed: bool):
        def update_day(org: DaySetting, value):
            if org.id != value.get('id'):
                raise ValueError()
            for x, y in zip(org.details, value.get('details')):
                if x.id != y.get('id'):
                    raise ValueError()
                x.require = y.get('require')
            return org
        
        def new_fixed_schedule(value):
            participant_ids = list(map(lambda x: x.get('id'), value.get('participants')))
            return FixedSchedule.new_schedule(
                value.get('title'), datetime.strptime(value.get('on_from'), '%Y-%m-%d').date(),
                datetime.strptime(value.get('on_to'), '%Y-%m-%d').date(),
                datetime.strptime(value.get('at_from'), '%H:%M:%S').time(),
                datetime.strptime(value.get('at_to'), '%H:%M:%S').time(),
                [x for x in operators if x.id in participant_ids])
        
        def update_fixed_schedule(org: FixedSchedule, value):
            org.title = value.get('title')
            org.on_from = datetime.strptime(value.get('on_from'), '%Y-%m-%d').date()
            org.on_to = datetime.strptime(value.get('on_to'), '%Y-%m-%d').date()
            org.at_from = datetime.strptime(value.get('at_from'), '%H:%M:%S').time()
            org.at_to = datetime.strptime(value.get('at_to'), '%H:%M:%S').time()
            participant_ids = list(map(lambda x: x.get('id'), value.get('participants')))
            org.participants = [x for x in operators if x.id in participant_ids]
            return org
        
        operators = OperatorQuery(self._session).get_operators()
        
        monthly_setting = SchedulerQuery(self._session).get_month_year_setting(id_)
        monthly_setting.days = [update_day(x, y) for x, y in zip(monthly_setting.days, days)]
        monthly_setting.holidays = holidays
        fixed_schedule_ids = [x.id for x in monthly_setting.fixed_schedules]
        monthly_setting.fixed_schedules\
            = [update_fixed_schedule(next(filter(lambda y: y.id == x.get('id'), monthly_setting.fixed_schedules)), x)
               if x.get('id') in fixed_schedule_ids
               else new_fixed_schedule(x)
               for x in fixed_schedules]
        monthly_setting.is_published = is_published
        monthly_setting.is_fixed = is_fixed
        return monthly_setting
    
    def public_monthly_setting(self, id_: str):
        monthly_setting = SchedulerQuery(self._session).get_month_year_setting(id_)
        monthly_setting.is_published = True
        return monthly_setting
        
    def append_work_category(self, title: str, week_day_require: int, week_day_max: int,
                             holiday_require: int, holiday_max: int, rest_days: int, max_times: int,
                             essential_skill_ids: [str], essential_operator_ids: [str], impossible_operator_ids: [str]):
        skills = SkillQuery(self._session).get_skills()
        essential_skills = [x for x in skills if x.id in essential_skill_ids]
        operators = OperatorQuery(self._session).get_operators()
        essential_operators = [x for x in operators if x.id in essential_operator_ids]
        impossible_operators = [x for x in operators if x.id in impossible_operator_ids]
        work_category = WorkCategory.new_category(
            title, week_day_require, week_day_max,
            holiday_require, holiday_max, rest_days, max_times,
            essential_skills, essential_operators, impossible_operators)
        self._session.add(work_category)
        return work_category
    
    def update_work_category(self, id_: str, title: str, week_day_require: int, week_day_max: int,
                             holiday_require: int, holiday_max: int, rest_days: int, max_times: int,
                             essential_skill_ids: [str], essential_operator_ids: [str], impossible_operator_ids: [str]):
        work_category = SchedulerQuery(self._session).get_work_category(id_)
        work_category.title = title
        work_category.week_day_require = week_day_require
        work_category.week_day_max = week_day_max
        work_category.holiday_require = holiday_require
        work_category.holiday_max = holiday_max
        work_category.rest_days = rest_days
        work_category.max_times = max_times
        skills = SkillQuery(self._session).get_skills()
        work_category.essential_skills = [x for x in skills if x.id in essential_skill_ids]
        operators = OperatorQuery(self._session).get_operators()
        work_category.essential_operators = [x for x in operators if x.id in essential_operator_ids]
        work_category.impossible_operators = [x for x in operators if x.id in impossible_operator_ids]
        return work_category
    
    def append_scheduler(self, affiliation_id: str):
        affiliation = AffiliationQuery(self._session).get_affiliation(affiliation_id)
        scheduler = Scheduler.new_scheduler(affiliation)
        self._session.add(scheduler)
        return scheduler

    def update_option(self, id_: str, affiliation_id: str, certified_skill: bool,
                      not_certified_skill: bool, work_category_ids: [str]):
        schedule_query = SchedulerQuery(self._session)
        scheduler = schedule_query.get_scheduler(id_)
        scheduler.affiliation = AffiliationQuery(self._session).get_affiliation(affiliation_id)
        scheduler.certified_skill = certified_skill
        scheduler.not_certified_skill = not_certified_skill
        scheduler.work_categories = [schedule_query.get_work_category(x) for x in work_category_ids]
        map(lambda x: x.update_categories(scheduler.work_categories), scheduler.month_year_settings)
        return scheduler
