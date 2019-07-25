# -*- coding: utf-8 -*-

from domains.models.operator import Skill
from domains.models.operator import Operator

from . import OperatorQuery


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def save_operator(self, operator: Operator):
        self._session.merge(operator)
        return operator

    def save_skill(self, skill: Skill):
        self._session.merge(skill)
        return skill

    def delete_skill(self, id_: str):
        skill = OperatorQuery(self._session).get_skill(id_)
        self._session.delete(skill)
