# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import Skill


class SkillCommand:
    def __init__(self, session):
        self._session = session

    def _append_skill(self, skill: Skill):
        self._session.add(skill)

    def append_certified_skill(self, name: str, score: int):
        skill = Skill.new_certified_skill(name, score)
        self._append_skill(skill)
        return skill

    def append_not_certified_skill(self, name: str, score: int):
        skill = Skill.new_not_certified_skill(name, score)
        self._append_skill(skill)
        return skill
