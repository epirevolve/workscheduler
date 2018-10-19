# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import User
from workscheduler.domains.models.relation import Relation
from workscheduler.domains.models.operator_skill import OperatorSkill


class UserQuery:
    def __init__(self, session):
        self._session = session
    
    def get_user(self, id: str) -> User:
        return self._session.query(User).get(id)

    def get_users(self) -> [User]:
        return self._session.query(User).order_by(User.id).all()
    
    def get_skills(self):
        return self._session.query(OperatorSkill).order_by(OperatorSkill.id).all()
    
    def get_relations(self):
        return self._session.query(Relation).order_by(Relation.user_1, Relation.user_2).all()
