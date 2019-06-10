# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.models.user import Team
from domains.models.user import User


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
    
    def get_active_operators_of_team_id(self, team_id: str) -> [Operator]:
        return self._session.query(Operator)\
            .filter(Operator.user.has(User.is_operator),
                    Operator.user.has(User.team.has(Team.id == team_id)),
                    Operator.user.has(User.is_inactivated.is_(False))).all()
