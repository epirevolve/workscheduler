# -*- coding: utf-8 -*-

from datetime import datetime
from workscheduler.applications.services import OperatorQuery
from workscheduler.domains.models.operator import Request


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def append_my_request(self, id: str, title: str, note: str,
                          at_from: datetime, at_to: datetime):
        operator_query = OperatorQuery(self._session)
        operator = operator_query.get_operator(id)
        request = Request.new_request(title, note, at_from, at_to)
        operator.requests.append(request)
        return request
    
    def update_myself(self, id: str, skill_ids: [str]):
        operator_query = OperatorQuery(self._session)
        operator = operator_query.get_operator(id)
        skills = [x for x in operator_query.get_skills() if x.id in skill_ids]
        operator.skills = skills
