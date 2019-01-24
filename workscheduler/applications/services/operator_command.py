# -*- coding: utf-8 -*-

from datetime import datetime

from mypackages.utils.datetime import is_overlap
from workscheduler.applications.errors import (
    CalendarError, RequestError
)
from workscheduler.applications.services import (
    OperatorQuery, SkillQuery, SchedulerQuery
)
from workscheduler.domains.models.operator import Request


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def _request_validity(self, operator, at_from, at_to):
        scheduler = SchedulerQuery(self._session).get_calendar_of_affiliation_id_year_month(
            operator.user.affiliation.id, at_to.year, at_to.month)
        if not scheduler:
            raise CalendarError()
        for request in operator.requests:
            if is_overlap(at_from, at_to, request.at_from, request.at_to):
                raise RequestError()
    
    def append_my_request(self, user_id: str, title: str, note: str,
                          at_from: datetime, at_to: datetime) -> Request:
        operator = OperatorQuery(self._session).get_operator_of_user_id(user_id)
        self._request_validity(operator, at_from, at_to)
        request = Request.new_request(title, note, at_from, at_to)
        operator.requests.append(request)
        return request
    
    def update_myself(self, operator_id: str, skill_ids: [str], remain_paid_holiday: int):
        operator = OperatorQuery(self._session).get_operator(operator_id)
        certified_skills = SkillQuery(self._session).get_certified_skills()
        my_skills = [x for x in certified_skills if x.id in skill_ids]
        operator.certified_skills = my_skills
        operator.remain_paid_holiday = remain_paid_holiday
