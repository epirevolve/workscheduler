# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import Operator


class OperatorQuery:
    def __init__(self, session):
        self._session = session
    
    def get_operator(self, id: str):
        return self._session.query(Operator).get(id)
    
    def get_operators(self):
        return self._session.query(Operator).all()
