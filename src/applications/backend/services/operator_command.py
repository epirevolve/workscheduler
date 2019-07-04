# -*- coding: utf-8 -*-

from domains.models.operator import Skill

from . import OperatorQuery


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def update_myself(self, operator_id: str, skill_ids: [str], remain_paid_holidays: int):
        query = OperatorQuery(self._session)
        operator = query.get_operator(operator_id)
        skills = query.get_skills()
        my_skills = [x for x in skills if x.id in skill_ids]
        operator.skills = my_skills
        operator.remain_paid_holidays = remain_paid_holidays
        return operator
    
    def update_operator(self, operator_id: str, skill_ids: [str], ojt_id: str):
        query = OperatorQuery(self._session)
        operator = query.get_operator(operator_id)
        skills = query.get_skills()
        my_skills = [x for x in skills if x.id in skill_ids]
        ojt = query.get_operator(ojt_id) if ojt_id else None
        operator.skills = my_skills
        operator.ojt = ojt
        return operator

    def append_skill(self, name: str, score: int, is_certified: bool):
        skill = Skill.new(name, score, is_certified)
        self._session.add(skill)
        return skill

    def update_skill(self, id_: str, name: str, score: int, is_certified: bool):
        skill = OperatorQuery(self._session).get_skill(id_)
        skill.name = name
        skill.score = score
        skill.is_certified = is_certified
        return skill

    def delete_skill(self, id_: str):
        skill = OperatorQuery(self._session).get_skill(id_)
        self._session.delete(skill)
