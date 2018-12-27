# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import User
from workscheduler.domains.models.operator import (
    Skill, Relation
)
from workscheduler.applications.services import SkillQuery


class TestOperatorRepository:
    def test_get_skills(self, session):
        skill_repository = SkillQuery(session)
        skills = skill_repository.get_skills()
        assert 4 == len(skills)
        skill = skills[0]
        assert 'ccna' == skill.name
        assert 1 == skill.score
