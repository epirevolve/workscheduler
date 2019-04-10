# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import Operator
from workscheduler.domains.models.user import Affiliation
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
    
    def get_active_operators_of_affiliation_id(self, affiliation_id: str):
        return self._session.query(Operator)\
            .filter(Operator.user.has(User.is_operator),
                    Operator.user.has(User.affiliation.has(Affiliation.id == affiliation_id)),
                    Operator.user.has(User.is_inactivated.is_(False))).all()
