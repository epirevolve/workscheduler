# -*- coding: utf-8 -*-

from . import OperatorQuery
from . import SkillQuery


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def update_myself(self, operator_id: str, skill_ids: [str], remain_paid_holidays: int):
        operator = OperatorQuery(self._session).get_operator(operator_id)
        skills = SkillQuery(self._session).get_skills()
        my_skills = [x for x in skills if x.id in skill_ids]
        operator.skills = my_skills
        operator.remain_paid_holidays = remain_paid_holidays
        return operator
    
    def update_operator(self, operator_id: str, skill_ids: [str], ojt_id: str):
        operator_query = OperatorQuery(self._session)
        operator = operator_query.get_operator(operator_id)
        skills = SkillQuery(self._session).get_skills()
        my_skills = [x for x in skills if x.id in skill_ids]
        ojt = operator_query.get_operator(ojt_id) if ojt_id else None
        operator.skills = my_skills
        operator.ojt = ojt
        return operator
