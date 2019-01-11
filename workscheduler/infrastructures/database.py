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
        session.flush()

        default_id = BelongQuery(session).get_default_belong().id
        user_command = UserCommand(session)
        user_command.append_user('admin', '管理者', default_id, is_admin=True, is_operator=False)

        session.commit()
        session.close()
    
    def set_test(self):
        session = self.create_session()
        
        front = Belong.new_belong('フロント', '')
        session.add(front)
        session.add(Belong.new_belong('Sec', ''))
        session.add(Belong.new_belong('Secフロント', ''))
        
        belong_id = BelongQuery(session).get_default_belong().id
        user_command = UserCommand(session)
        user_command.append_user('user', 'ユーザ', belong_id, is_admin=False, is_operator=True)
        user_command.append_user('adope', '管理ユーザ', belong_id, is_admin=True, is_operator=True)

        from workscheduler.domains.models.operator.skill import Skill
        skill1 = Skill.new_certified_skill('ccna', 1)
        session.add(skill1)
        skill2 = Skill.new_certified_skill('ccnp', 3)
        session.add(skill2)
        session.add(Skill.new_certified_skill('lpic', 2))
        
        skill3 = Skill.new_not_certified_skill('夜間統制', 5)
        session.add(skill3)

        from workscheduler.domains.models.team import TeamCategory
        team_cat_1 = TeamCategory.new_team_category(
            'Night Operation Team', allow_multiple_belong=True,
            is_leader_required=False, min_member_count=0,
            max_member_count=3
        )
        session.add(team_cat_1)
        team_cat_2 = TeamCategory.new_team_category(
            'Specific Operation Team', allow_multiple_belong=False,
            is_leader_required=True, min_member_count=1,
            max_member_count=10
        )
        session.add(team_cat_2)

        from workscheduler.domains.models.team import Team
        team = Team.new_team(team_cat_1.id, 'Team A')
        session.add(team)
        user1 = user_command.append_user('test_user1', 'テストユーザ1', belong_id, is_admin=False, is_operator=True)
        team.users.append(user1)
        team = Team.new_team(team_cat_2.id, 'Team B')
        session.add(team)
        user2 = user_command.append_user('test_user2', 'テストユーザ2', belong_id, is_admin=False, is_operator=True)
        team.users.append(user2)
        user3 = user_command.append_user('test_user3', 'テストユーザ3', belong_id, is_admin=False, is_operator=True)
        team.users.append(user3)
        team = Team.new_team(team_cat_2.id, 'Team C')
        session.add(team)
        team.users.append(user_command.append_user('test_user4', 'テストユーザ4', belong_id, is_admin=False, is_operator=True))
        team.users.append(user_command.append_user('test_user5', 'テストユーザ5', belong_id, is_admin=False, is_operator=True))
        team.users.append(user_command.append_user('test_user6', 'テストユーザ6', belong_id, is_admin=False, is_operator=True))
        team = Team.new_team(team_cat_2.id, 'Team D')
        session.add(team)
        team.users.append(user_command.append_user('test_user7', 'テストユーザ7', belong_id, is_admin=False, is_operator=True))
        team.users.append(user_command.append_user('test_user8', 'テストユーザ8', belong_id, is_admin=False, is_operator=True))
        team.users.append(user_command.append_user('test_user9', 'テストユーザ9', belong_id, is_admin=False, is_operator=True))
        team.users.append(user_command.append_user('test_user10', 'テストユーザ10', belong_id, is_admin=False, is_operator=True))
        
        session.flush()
        
        from workscheduler.applications.services import OperatorQuery
        from workscheduler.domains.models.schedule import (
            SchedulerOption, WorkCategory
        )
        operator_query = OperatorQuery(session)
        scheduler = SchedulerOption.new_scheduler(
            front, True, True,
            [WorkCategory.new_category('日勤帯', 7, 10, 3, 5, 0, 0, [skill1, skill2],
                                       [operator_query.get_operator_of_user_id(user1.id),
                                        operator_query.get_operator_of_user_id(user2.id)],
                                       []),
             WorkCategory.new_category('夜間帯', 3, 5, 3, 5, 2, 5, [skill3], [],
                                       [operator_query.get_operator_of_user_id(user3.id)])]
        )
        session.add(scheduler)
        
        session.commit()
        session.close()
        
    def create_session(self):
        session = sessionmaker(bind=self._engine, autocommit=False, autoflush=False)
        return session()

    def drop(self):
        OrmBase.metadata.drop_all(self._engine)
