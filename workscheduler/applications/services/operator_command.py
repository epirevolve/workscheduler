# -*- coding: utf-8 -*-

from . import OperatorQuery
from . import SkillQuery


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def update_myself(self, operator_id: str, skill_ids: [str], remain_paid_holidays: int):
        operator = OperatorQuery(self._session).get_operator(operator_id)
        skills = SkillQuery(self._session).get_skills()
        my_skills = [x for x in skills if x.id in skill_ids] + [x for x in operator.skills if not x.is_certified]
        operator.skills = my_skills
        operator.remain_paid_holidays = remain_paid_holidays
        return operator
