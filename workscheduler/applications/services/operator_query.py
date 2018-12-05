# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import (
    Operator, Skill, Relation
)


class OperatorQuery:
    def __init__(self, session):
        self._session = session
    
    def get_operator(self, id: str):
        return self._session.query(Operator).get(id)
    
    def get_skills(self):
        return self._session.query(Skill).order_by(Skill.id).all()
    
    def get_relations(self):
        return self._session.query(Relation).order_by(Relation.myself_id, Relation.colleague_id).all()
