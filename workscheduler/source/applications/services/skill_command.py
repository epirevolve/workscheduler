# -*- coding: utf-8 -*-

from domains.models.operator import Skill
from . import SkillQuery


class SkillCommand:
    def __init__(self, session):
        self._session = session

    def append_skill(self, name: str, score: int, is_certified: bool):
        skill = Skill.new(name, score, is_certified)
        self._session.add(skill)
        return skill
    
    def update_skill(self, id_: str, name: str, score: int, is_certified: bool):
        skill = SkillQuery(self._session).get_skill(id_)
        skill.name = name
        skill.score = score
        skill.is_certified = is_certified
        return skill
    
    def delete_skill(self, id_: str):
        skill = SkillQuery(self._session).get_skill(id_)
        self._session.delete(skill)
