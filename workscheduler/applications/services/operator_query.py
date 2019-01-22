# -*- coding: utf-8 -*-

from datetime import date
from mypackages.utils.date import is_between
from workscheduler.domains.models.operator import (
    Request, Operator
)
from workscheduler.domains.models.user import User


class OperatorQuery:
    def __init__(self, session):
        self._session = session
    
    def get_operator(self, id_: str) -> Operator:
        return self._session.query(Operator).get(id_)
    
    def get_operator_of_user_id(self, user_id: str) -> Operator:
        return self._session.query(Operator)\
            .filter(Operator.user.has(User.id == user_id)).one()
    
    def get_operators(self) -> [Operator]:
        return self._session.query(Operator)\
            .filter(Operator.user.has(User.is_operator)).all()

    def get_requests(self) -> [Request]:
        return self._session.query(Request).all()

    def get_requests_of_date(self, value: date) -> [Request]:
        return self._session.query(Request)\
            .filter(is_between(value, Request.at_from, Request.at_to)).all()
