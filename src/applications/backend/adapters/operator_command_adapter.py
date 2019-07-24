# -*- coding: utf-8 -*-

from backend.services import OperatorCommand
from backend.services.domain_orm import to_operator
from backend.services.domain_orm import to_skill


class OperatorCommandAdapter:
    def __init__(self, session):
        self._session = session
    
    def update_operator(self, data):
        operator = to_operator(data)
        return OperatorCommand(self._session).update_operator(operator)

    def append_skill(self, data):
        skill = to_skill(data)
        if skill.score < 1 or skill.score > 10:
            raise ValueError
        return OperatorCommand(self._session).append_skill(skill)

    def update_skill(self, data):
        skill = to_skill(data)
        if skill.score < 1 or skill.score > 10:
            raise ValueError
        return OperatorCommand(self._session).update_skill(skill)

    def delete_skill(self, id_):
        if not id_:
            raise ValueError
        OperatorCommand(self._session).delete_skill(id_)

