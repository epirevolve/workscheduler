# -*- coding: utf-8 -*-

from workscheduler.applications.services import OperatorQuery


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def store_myself(self, id: str, skill_ids: [str]):
        operator_query = OperatorQuery(self._session)
        operator = operator_query.get_operator(id)
        skills = [x for x in operator_query.get_skills() if x.id in skill_ids]
        operator.skills = skills
