# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from workscheduler.applications.services import (
    UserCommand, BelongQuery
)
from workscheduler.domains.models import OrmBase
from workscheduler.domains.models.user.belong import Belong


class Database:
    def __init__(self, sql_connection, echo=False):
        self._engine = create_engine('sqlite:///{}'.format(sql_connection), echo=echo)

    def init(self):
        self.drop()
        OrmBase.metadata.create_all(bind=self._engine)

        # set initial data
        session = self.create_session()

        session.add(Belong.not_belong())
        session.add(Belong.new_belong('フロント', ''))
        session.add(Belong.new_belong('Sec', ''))
        session.add(Belong.new_belong('Secフロント', ''))
        session.commit()

        default = BelongQuery(session).get_default_belong()
        user_command = UserCommand(session)
        user_command.append_user('admin', '管理者', default, is_admin=True, is_operator=False)
        user_command.append_user('user', 'ユーザ', default, is_admin=False, is_operator=True)
        user_command.append_user('adope', '管理ユーザ', default, is_admin=True, is_operator=True)

        # sample data
        from workscheduler.domains.models.operator.skill import Skill
        session.add(Skill.new_certified_skill('ccna', 1))
        session.add(Skill.new_certified_skill('ccnp', 3))
        session.add(Skill.new_certified_skill('lpic', 2))
        
        session.add(Skill.new_not_certified_skill('夜間統制', 5))
        
        # sample data
        from workscheduler.domains.models.team.team_category import TeamCategoryFactory
        session.add(TeamCategoryFactory.register_a_test_team_category('1', 'Night Operation Team', allow_multiple_belonging=True, is_leader_required=False, min_member_count=0, max_member_count=3))
        session.add(TeamCategoryFactory.register_a_test_team_category('2', 'Specific Operation Team', allow_multiple_belonging=False, is_leader_required=True, min_member_count=1, max_member_count=10))

        # sample data
        from workscheduler.domains.models.team.team import TeamFactory
        from workscheduler.domains.models.user.user import User
        team = TeamFactory.register_a_test_team('1', '1', 'Team A')
        session.add(team)
        team.users.append(User.new_member('test_user1', 'テストユーザ1', default, is_admin=False, is_operator=True))
        team = TeamFactory.register_a_test_team('2', '2', 'Team B')
        session.add(team)
        team.users.append(User.new_member('test_user2', 'テストユーザ2', default, is_admin=False, is_operator=True))
        team.users.append(User.new_member('test_user3', 'テストユーザ3', default, is_admin=False, is_operator=True))
        team = TeamFactory.register_a_test_team('3', '2', 'Team C')
        session.add(team)
        team.users.append(User.new_member('test_user4', 'テストユーザ4', default, is_admin=False, is_operator=True))
        team.users.append(User.new_member('test_user5', 'テストユーザ5', default, is_admin=False, is_operator=True))
        team.users.append(User.new_member('test_user6', 'テストユーザ6', default, is_admin=False, is_operator=True))
        team = TeamFactory.register_a_test_team('4', '2', 'Team D')
        session.add(team)
        team.users.append(User.new_member('test_user7', 'テストユーザ7', default, is_admin=False, is_operator=True))
        team.users.append(User.new_member('test_user8', 'テストユーザ8', default, is_admin=False, is_operator=True))
        team.users.append(User.new_member('test_user9', 'テストユーザ9', default, is_admin=False, is_operator=True))
        team.users.append(User.new_member('test_user10', 'テストユーザ10', default, is_admin=False, is_operator=True))

        session.commit()
        session.close()

    def create_session(self):
        session = sessionmaker(bind=self._engine, autocommit=False, autoflush=False)
        return session()

    def drop(self):
        OrmBase.metadata.drop_all(self._engine)
