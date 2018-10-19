# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import UserFactory
from workscheduler.domains.models.relation import Relation
from workscheduler.domains.models.operator_skill import OperatorSkillFactory
from workscheduler.applications.services.user_query import UserQuery


class TestUserRepository:
    def test_get_user(self, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        user = users[0]
        get_user = user_repository.get_user(user.id)
        assert get_user
        assert user.id == get_user.id

    def test_get_users(self, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        assert 2 == len(users)
        user = users[0]
        assert user.id
        assert 'admin' == user.login_id
        assert 'minAd' == user.password
        assert '管理者' == user.name
        assert user.create_at
    
    def test_append_user(self, session):
        skill = OperatorSkillFactory.evaluate_a_skill('ccna', 2)
        session.add(skill)
        user_repository = UserQuery(session)
        user = UserFactory.join_a_member('test_login', 'login_pass', 'tester', is_admin=False, is_operator=True)
        user.skills.append(skill)
        session.add(user)
        session.commit()
        users = user_repository.get_users()
        assert 3 == len(users)
        user = users[2]
        assert user.id
        assert 'test_login' == user.login_id
        assert 'login_pass' == user.password
        assert 'tester' == user.name
        assert not user.is_admin
        assert user.is_operator

    def test_update_user(self, session):
        user_repository = UserQuery(session)
        users = user_repository.get_users()
        user = users[1]
        import copy
        origin_user = copy.copy(user)
        user.login_id = 'testchanged'
        session.commit()
        users = user_repository.get_users()
        assert 2 == len(users)
        user = users[1]
        assert user.id
        assert 'testchanged' == user.login_id
        assert origin_user.login_id != user.login_id
        assert origin_user.password == user.password
        assert origin_user.name == user.name
        assert origin_user.is_admin == user.is_admin
        assert origin_user.is_operator == user.is_operator
        assert origin_user.create_at == user.create_at
        
    def test_append_relation(self, session):
        user_repository = UserQuery(session)
        session.add(Relation('2', '1', '2', 0.4, '2'))
        session.commit()
        relations = user_repository.get_relations()
        assert 1 == len(relations)
        relation = relations[0]
        assert '2' == relation.id
        assert '1' == relation.user_1
        assert '2' == relation.user_2
        assert 0.4 == relation.affinity
        assert '2' == relation.looked_by
