# -*- coding: utf-8 -*-

from domains.models.operator import Skill
from domains.models.operator import Operator
from domains.models.user import Team
from domains.models.user import User
from domains.models.user import UserRole


class OperatorQuery:
    def __init__(self, session):
        self._session = session
    
    def get_operator(self, id: str) -> Operator:
        return self._session.query(Operator).get(id)
    
    def get_operator_of_user_id(self, user_id: str) -> Operator:
        return self._session.query(Operator) \
            .filter(Operator.user.has(User.id == user_id)).one()
    
    def get_operators(self) -> [Operator]:
        return self._session.query(Operator) \
            .filter(Operator.user.has(User.role == UserRole.OPERATOR)).all()
    
    def get_active_operators_of_team_id(self, team_id: str) -> [Operator]:
        return self._session.query(Operator) \
            .filter(Operator.user.has(User.role == UserRole.OPERATOR),
                    Operator.user.has(User.team.has(Team.id == team_id)),
                    Operator.user.has(User.is_inactivated.is_(False))).all()

    def get_skill(self, id) -> Skill:
        return self._session.query(Skill).get(id)

    def get_skills(self) -> [Skill]:
        return self._session.query(Skill).order_by(Skill.id).all()

    def get_certified_skills(self) -> [Skill]:
        return self._session.query(Skill).filter(Skill.is_certified) \
            .order_by(Skill.id).all()

    def get_not_certified_skills(self) -> [Skill]:
        return self._session.query(Skill).filter(Skill.is_certified.is_(False)) \
            .order_by(Skill.id).all()
