# -*- coding: utf-8 -*-

from workscheduler.applications.services import (
    BelongQuery, OperatorQuery, SkillQuery,
    ScheduleQuery
)
from workscheduler.domains.models.schedule import (
    Scheduler, WorkCategory
)


class ScheduleCommand:
    def __init__(self, session):
        self._session = session
    
    def append_work_category(self, title: str, default: int, holiday: int,
                             rest_days: int, essential_skill_ids: [str],
                             essential_operator_ids: [str], impossible_operator_ids: [str]):
        skills = SkillQuery(self._session).get_skills()
        essential_skills = [x for x in skills if x.id in essential_skill_ids]
        operators = OperatorQuery(self._session).get_operators()
        essential_operators = [x for x in operators if x.id in essential_operator_ids]
        impossible_operators = [x for x in operators if x.id in impossible_operator_ids]
        work_category = WorkCategory.new_category(
            title, default, holiday, rest_days,
            essential_skills, essential_operators,
            impossible_operators)
        self._session.add(work_category)
        return work_category
    
    def append_scheduler(self, belong_id: str, certified_skill: bool,
                         not_certified_skill: bool, work_category_ids: [str]):
        belong = BelongQuery(self._session).get_belong(belong_id)
        schedule_query = ScheduleQuery(self._session)
        work_categories = [schedule_query.get_work_category(x) for x in work_category_ids]
        scheduler = Scheduler.new_scheduler(belong, certified_skill, not_certified_skill,
                                            work_categories)
        self._session.add(scheduler)
        return scheduler
    
    def update_scheduler(self, id: str, belong_id: str, certified_skill: bool,
                         not_certified_skill: bool, work_category_ids: [str]):
        schedule_query = ScheduleQuery(self._session)
        scheduler = schedule_query.get_scheduler(id)
        scheduler.belong = BelongQuery(self._session).get_belong(belong_id)
        scheduler.certified_skill = certified_skill
        scheduler.not_certified_skill = not_certified_skill
        scheduler.work_categories = [schedule_query.get_work_category(x) for x in work_category_ids]
        return scheduler
