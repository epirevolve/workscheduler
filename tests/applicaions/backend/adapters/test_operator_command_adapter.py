# -*- coding: utf-8 -*-

import pytest

import src.utils.jsonize as jsonize

from src.applications.backend.adapters import OperatorCommandAdapter
from src.applications.backend.services import OperatorQuery
from src.domains.models.operator import Skill


class TestOperatorCommandAdapter:
    def test_save_operator_update(self, session):
        adapter = OperatorCommandAdapter(session)
        query = OperatorQuery(session)

        operators = query.get_operators()
        skills = query.get_skills()
        target = operators[-1]
        target.skills.append(skills[-1])
        target.ojt = operators[-2]
        target.remain_paid_holidays = 5
        data = jsonize.dumps(target)
        adapter.save_operator(jsonize.loads(data))
        session.flush()
        session.expunge_all()

        result = query.get_operator(target.id)
        assert result
        assert target.id == result.id
        assert target.skills == result.skills == [skills[-1]]
        assert target.ojt == result.ojt == operators[-2]
        assert target.remain_paid_holidays == result.remain_paid_holidays == 5

    @pytest.mark.parametrize("x, y, z", [
        ("test 1", 3, True),
        ("test 2", 10, False),
        ("test 3", 1, True),
    ])
    def test_save_skill_append(self, session, x, y, z):
        adapter = OperatorCommandAdapter(session)
        query = OperatorQuery(session)

        target = Skill.new(x, y, z)
        data = jsonize.dumps(target)
        adapter.save_skill(jsonize.loads(data))
        session.flush()
        session.expunge_all()

        result = query.get_skill(target.id)
        assert result
        assert target.id == result.id
        assert target.name == result.name == x
        assert target.score == result.score == y
        assert target.is_certified == result.is_certified == z

    def test_save_skill_update(self, session):
        adapter = OperatorCommandAdapter(session)
        query = OperatorQuery(session)

        target = query.get_skills()[-1]
        target.name = "test skill"
        target.score = 9
        target.is_certified = False
        data = jsonize.dumps(target)
        adapter.save_skill(jsonize.loads(data))
        session.flush()
        session.expunge_all()

        result = query.get_skill(target.id)
        assert result
        assert 'test skill' == result.name
        assert 9 == result.score
        assert not result.is_certified

    @pytest.mark.parametrize("x, y, z", [
        ("test 1", -1, True),
        ("test 2", 11, False),
    ])
    def test_save_skill_exception_1(self, session, x, y, z):
        adapter = OperatorCommandAdapter(session)

        target = Skill.new(x, y, z)
        data = jsonize.dumps(target)
        with pytest.raises(ValueError):
            adapter.save_skill(jsonize.loads(data))

    def test_save_skill_exception_2(self, session):
        adapter = OperatorCommandAdapter(session)

        with pytest.raises(AssertionError):
            target = Skill.new("test 1", 0, True)
            data = jsonize.dumps(target)
            adapter.save_skill(jsonize.loads(data))

    def test_delete_skill(self, session):
        adapter = OperatorCommandAdapter(session)
        query = OperatorQuery(session)

        target = query.get_skills()[-1]
        adapter.delete_skill(target.id)
        session.flush()
        session.expunge_all()

        result = query.get_skill(target.id)
        assert not result
