# -*- coding: utf-8 -*-

from applications.services import SkillCommand


class SkillCommandAdapter:
    def __init__(self, session):
        self._session = session
    
    def append_skill(self, data):
        name = data.get('name')
        score_str = data.get('score')
        is_certified = data.get('is_certified')
        if not name or not score_str or not score_str.isdecimal():
            raise ValueError
        score = int(score_str)
        if score < 1 or score > 10:
            raise ValueError
        return SkillCommand(self._session).append_skill(name, score, is_certified)
    
    def update_skill(self, data):
        id_ = data.get('id')
        name = data.get('name')
        score = data.get('score')
        is_certified = data.get('is_certified')
        if not id_ or not name or not score:
            raise ValueError
        if isinstance(score, str):
            if not score.isdecimal():
                raise ValueError
            score = int(score)
        if score < 1 or score > 10:
            raise ValueError
        return SkillCommand(self._session).update_skill(id_, name, score, is_certified)
    
    def delete_skill(self, id_):
        if not id_:
            raise ValueError
        SkillCommand(self._session).delete_skill(id_)
