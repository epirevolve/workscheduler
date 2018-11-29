# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import (
    User, Skill, Relation
)


class UserQuery:
    def __init__(self, session):
        self._session = session
    
    def get_user(self, id: str) -> User:
        return self._session.query(User).get(id)

    def get_users(self) -> [User]:
        return self._session.query(User).order_by(User.id).all()
    
    def get_skills(self):
        return self._session.query(Skill).order_by(Skill.id).all()
    
    def get_relations(self):
        return self._session.query(Relation).order_by(Relation.myself_id, Relation.colleague_id).all()
