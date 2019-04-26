# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import time
from datetime import date

from mypackages.utils.date import get_next_day

from workscheduler.applications.errors import AlreadyLaunchError
from workscheduler.domains.models.scheduler import Scheduler
from workscheduler.domains.models.scheduler import WorkCategory
from workscheduler.domains.models.scheduler import FixedSchedule
from workscheduler.domains.models.scheduler import DaySetting
from workscheduler.domains.models.scheduler import Vacation
from . import AffiliationQuery
from . import OperatorQuery
from . import SkillQuery
from . import SchedulerQuery
from . import ScheduleCommand


class SchedulerCommand:
    def __init__(self, session):
        self._session = session
    
    def _add_fixed_schedule(self, monthly_setting_id: str, fixed_schedule: FixedSchedule):
        scheduler = SchedulerQuery(self._session).get_scheduler_of_monthly_setting_id(monthly_setting_id)
        search_date = fixed_schedule.on_from
        while search_date <= fixed_schedule.on_to:
            monthly_setting = scheduler.monthly_setting(search_date.month, search_date.year)
            while search_date.month == monthly_setting.month and search_date <= fixed_schedule.on_to:
                monthly_setting.days[search_date.day - 1].fixed_schedules.append(fixed_schedule)
                search_date = get_next_day(search_date)
    
    def _append_fixed_schedule(self, monthly_setting_id: str, title: str,
                               on_from: date, on_to: date,
                               at_from: time, at_to: time, participants: []):
        fixed_schedule = FixedSchedule.new_schedule(title, on_from, on_to,
                                                    at_from, at_to, participants)
        self._add_fixed_schedule(monthly_setting_id, fixed_schedule)
        return fixed_schedule
    
    def _update_fixed_schedule(self, monthly_setting_id: str, id_: str, title: str,
                               on_from: date, on_to: date,
                               at_from: time, at_to: time, participants: []):
        fixed_schedules = SchedulerQuery(self._session).get_fixed_schedules_of_id(id_)
        for fixed_schedule in fixed_schedules:
            self._session.delete(fixed_schedule)
        self._session.flush()
        fixed_schedule = FixedSchedule(id_, title, on_from, on_to,
                                       at_from, at_to, participants)
        self._add_fixed_schedule(monthly_setting_id, fixed_schedule)
        return fixed_schedule
    
    def update_fixed_schedules(self, monthly_setting_id: str, fixed_schedules: []):
        monthly_setting = SchedulerQuery(self._session).get_monthly_setting(monthly_setting_id)
        operators = OperatorQuery(self._session).get_operators()
        
        fixed_schedule_ids = [y.id for x in monthly_setting.days for y in x.fixed_schedules]
        monthly_setting.fixed_schedules\
            = [self._update_fixed_schedule(monthly_setting_id, x.id, x.title,
                                           x.on_from, x.on_to, x.at_from, x.at_to,
                                           [y for y in operators if y.id in x.participants])
               if x.id in fixed_schedule_ids
               else self._append_fixed_schedule(monthly_setting_id, x.title, x.on_from, x.on_to,
                                                x.at_from, x.at_to,
                                                [y for y in operators if y.id in x.participants])
               for x in fixed_schedules]
        return monthly_setting
    
    def update_monthly_setting(self, id_: str, days: [], holidays: int):
        def update_day(org: DaySetting, value):
            if org.id != value.id:
                raise ValueError()
            org.is_holiday = value.is_holiday
            for x, y in zip(org.details, value.details):
                if x.id != y.id:
                    raise ValueError()
                x.require = y.require
            return org
        
        monthly_setting = SchedulerQuery(self._session).get_monthly_setting(id_)
        monthly_setting.days = [update_day(x, y) for x, y in zip(monthly_setting.days, days)]
        monthly_setting.holidays = holidays
        return monthly_setting
    
    def public_monthly_setting(self, id_: str):
        monthly_setting = SchedulerQuery(self._session).get_monthly_setting(id_)
        monthly_setting.is_published = True
        return monthly_setting
        
    def append_work_category(self, title: str, at_from: time, at_to: time,
                             week_day_require: int, week_day_max: int, holiday_require: int, holiday_max: int,
                             day_offs: int, max_times: int, week_day_operator_ids: [str],
                             holiday_operator_ids: [str], essential_skill_ids: [str],
                             exclusive_operator_ids: [str], impossible_operator_ids: [str]):
        skills = SkillQuery(self._session).get_skills()
        essential_skills = [x for x in skills if x.id in essential_skill_ids]
        operators = OperatorQuery(self._session).get_operators()
        week_day_operators = [x for x in operators if x.id in week_day_operator_ids]
        holiday_operators = [x for x in operators if x.id in holiday_operator_ids]
        exclusive_operators = [x for x in operators if x.id in exclusive_operator_ids]
        impossible_operators = [x for x in operators if x.id in impossible_operator_ids]
        work_category = WorkCategory.new_category(
            title, at_from, at_to,
            week_day_require, week_day_max,
            holiday_require, holiday_max, day_offs, max_times,
            week_day_operators, holiday_operators, essential_skills,
            exclusive_operators, impossible_operators)
        self._session.add(work_category)
        return work_category
    
    def update_work_category(self, id_: str, title: str, at_from: time,
                             at_to: time, week_day_require: int, week_day_max: int,
                             holiday_require: int, holiday_max: int, day_offs: int,
                             max_times: int, week_day_operator_ids: [str], holiday_operator_ids: [str],
                             essential_skill_ids: [str], exclusive_operator_ids: [str], impossible_operator_ids: [str]):
        work_category = SchedulerQuery(self._session).get_work_category(id_)
        work_category.title = title
        work_category.at_from = at_from
        work_category.at_to = at_to
        work_category.week_day_require = week_day_require
        work_category.week_day_max = week_day_max
        work_category.holiday_require = holiday_require
        work_category.holiday_max = holiday_max
        work_category.day_offs = day_offs
        work_category.max_times = max_times
        skills = SkillQuery(self._session).get_skills()
        work_category.essential_skills = [x for x in skills if x.id in essential_skill_ids]
        operators = OperatorQuery(self._session).get_operators()
        work_category.week_day_operators = [x for x in operators if x.id in week_day_operator_ids]
        work_category.holiday_operators = [x for x in operators if x.id in holiday_operator_ids]
        work_category.exclusive_operators = [x for x in operators if x.id in exclusive_operator_ids]
        work_category.impossible_operators = [x for x in operators if x.id in impossible_operator_ids]
        return work_category
    
    def append_scheduler(self, affiliation_id: str):
        affiliation = AffiliationQuery(self._session).get_affiliation(affiliation_id)
        scheduler = Scheduler.new_scheduler(affiliation)
        self._session.add(scheduler)
        return scheduler

    def update_basic_setting(self, id_: str, affiliation_id: str, certified_skill: bool,
                             not_certified_skill: bool, work_category_ids: [str]):
        schedule_query = SchedulerQuery(self._session)
        scheduler = schedule_query.get_scheduler(id_)
        scheduler.affiliation = AffiliationQuery(self._session).get_affiliation(affiliation_id)
        scheduler.certified_skill = certified_skill
        scheduler.not_certified_skill = not_certified_skill
        scheduler.work_categories = [schedule_query.get_work_category(x) for x in work_category_ids]
        map(lambda x: x.update_categories(scheduler.work_categories), scheduler.monthly_settings)
        return scheduler
    
    def append_vacation(self, title: str, on_from: datetime,
                        on_to: datetime, days: int):
        vacation = Vacation.new_vacation(title, on_from, on_to, days)
        self._session.add(vacation)
        return vacation
    
    def update_vacation(self, id_: str, title: str,
                        on_from: datetime, on_to: datetime, days: int):
        vacation = SchedulerQuery(self._session).get_vacation(id_)
        vacation.title = title
        vacation.on_from = on_from
        vacation.on_to = on_to
        vacation.days = days
        return vacation
        
    def update_yearly_setting(self, scheduler_id: str, year: int, vacations: []):
        scheduler = SchedulerQuery(self._session).get_scheduler(scheduler_id)
        yearly_setting = scheduler.yearly_setting(year)
        vacation_ids = [x.id for x in yearly_setting.vacations]
        yearly_setting.vacations = [
            self.append_vacation(x.title, x.on_from, x.on_to, x.days) if x.id not in vacation_ids
            else self.update_vacation(x.id, x.title, x.on_from, x.on_to, x.days) for x in vacations]
    
    def launch(self, affiliation_id: str, month: int, year: int):
        operators = OperatorQuery(self._session).get_active_operators_of_affiliation_id(affiliation_id)
        scheduler = SchedulerQuery(self._session).get_scheduler_of_affiliation_id(affiliation_id)
        # if scheduler.is_launching:
        #     raise AlreadyLaunchError()
        try:
            scheduler.is_launching = True
            self._session.commit()
            schedule = scheduler.run(month, year, operators)
            ScheduleCommand(self._session).append_new_schedule(affiliation_id, year, month,
                                                               schedule)
        finally:
            scheduler.is_launching = False
            self._session.commit()
