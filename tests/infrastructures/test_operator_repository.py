# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import UserFactory
from workscheduler.domains.models.operator import (
    SkillFactory, Relation
)
from workscheduler.applications.services import UserQuery


class TestOperatorRepository:
    def test_append_relation(self, session):
        user_repository = UserQuery(session)
        session.add(Relation('2', '1', '2', 0.4))
        session.commit()
        relations = user_repository.get_relations()
        assert 1 == len(relations)
        relation = relations[0]
        assert '2' == relation.id
        assert '1' == relation.myself_id
        assert '2' == relation.colleague_id
        assert 0.4 == relation.affinity
    
    def test_get_skills(self, session):
        user_repository = UserQuery(session)
        skills = user_repository.get_skills()
        assert 3 == len(skills)
        skill = skills[0]
        assert 'ccna' == skill.name
        assert 1 == skill.score
