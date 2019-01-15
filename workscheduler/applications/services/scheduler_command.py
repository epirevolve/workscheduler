# -*- coding: utf-8 -*-

from workscheduler.applications.services import (
    BelongQuery, OperatorQuery, SkillQuery,
    SchedulerQuery
)
from workscheduler.domains.models.scheduler import (
    Options, WorkCategory
)


class SchedulerCommand:
    def __init__(self, session):
        self._session = session
    
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
    
    def update_work_category(self, id: str, title: str, week_day_require: int, week_day_max: int,
                             holiday_require: int, holiday_max: int, rest_days: int, max_times: int,
                             essential_skill_ids: [str], essential_operator_ids: [str], impossible_operator_ids: [str]):
        work_category = SchedulerQuery(self._session).get_work_category(id)
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
    
    def append_option(self, belong_id: str, certified_skill: bool,
                      not_certified_skill: bool, work_category_ids: [str]):
        belong = BelongQuery(self._session).get_belong(belong_id)
        schedule_query = SchedulerQuery(self._session)
        work_categories = [schedule_query.get_work_category(x) for x in work_category_ids]
        scheduler = Options.new_option(belong, certified_skill, not_certified_skill,
                                       work_categories)
        self._session.add(scheduler)
        return scheduler
    
    def update_option(self, id: str, belong_id: str, certified_skill: bool,
                      not_certified_skill: bool, work_category_ids: [str]):
        schedule_query = SchedulerQuery(self._session)
        scheduler = schedule_query.get_option(id)
        scheduler.belong = BelongQuery(self._session).get_belong(belong_id)
        scheduler.certified_skill = certified_skill
        scheduler.not_certified_skill = not_certified_skill
        scheduler.work_categories = [schedule_query.get_work_category(x) for x in work_category_ids]
        return scheduler
