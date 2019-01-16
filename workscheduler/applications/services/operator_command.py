# -*- coding: utf-8 -*-

from datetime import datetime

from workscheduler.applications.errors import CalendarError
from workscheduler.applications.services import (
    OperatorQuery, SkillQuery, SchedulerQuery
)
from workscheduler.domains.models.operator import Request


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def append_my_request(self, user_id: str, title: str, note: str,
                          at_from: datetime, at_to: datetime):
        operator = OperatorQuery(self._session).get_operator_of_user_id(user_id)
        scheduler = SchedulerQuery(self._session).get_calendar(operator.user.affiliation.id,
                                                               at_to.year, at_to.month)
        if not scheduler:
            raise CalendarError()
        request = Request.new_request(title, note, at_from, at_to)
        operator.requests.append(request)
        return request
    
    def update_myself(self, operator_id: str, skill_ids: [str], remain_paid_holiday: int):
        operator = OperatorQuery(self._session).get_operator(operator_id)
        certified_skills = SkillQuery(self._session).get_certified_skills()
        my_skills = [x for x in certified_skills if x.id in skill_ids]
        operator.certified_skills = my_skills
        operator.remain_paid_holiday = remain_paid_holiday
