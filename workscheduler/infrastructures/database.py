# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from workscheduler.applications.services import UserCommand
from workscheduler.applications.services import AffiliationQuery
from workscheduler.domains.models import OrmBase
from workscheduler.domains.models.user import Affiliation


class Database:
    def __init__(self, sql_connection, echo=False):
        self._engine = create_engine('sqlite:///{}'.format(sql_connection), echo=echo)

    def init(self):
        self.drop()
        OrmBase.metadata.create_all(bind=self._engine)

        # set initial data
        session = self.create_session()
        
        # default affiliation is directly added
        # usual affiliation is added by facade and make scheduler inside facade
        session.add(Affiliation.default())
        session.flush()

        default_id = AffiliationQuery(session).get_default_affiliation().id
        user_command = UserCommand(session)
        user_command.append_user('admin', '管理者', default_id, is_admin=True, is_operator=False)

        session.commit()
        session.close()

    def set_test(self):
        self.init()

        session = self.create_session()

        # add affiliations
        
        from workscheduler.applications.services import AffiliationFacade
        
        affiliation_facade = AffiliationFacade(session)
        front = affiliation_facade.append_affiliation('フロント', '')
        affiliation_facade.append_affiliation('Sec', '')
        affiliation_facade.append_affiliation('Secフロント', '')
        
        session.flush()

        # add users

        affiliation_id = AffiliationQuery(session).get_default_affiliation().id
        append_user = UserCommand(session).append_user
        append_user('user', 'ユーザ', affiliation_id, is_admin=False, is_operator=True)
        append_user('adope', '管理ユーザ', front.id, is_admin=True, is_operator=True)

        # add skills
        
        from workscheduler.domains.models.operator import Skill
        
        skill1 = Skill.new_skill('ccna', 1, is_certified=True)
        session.add(skill1)
        skill2 = Skill.new_skill('ccnp', 3, is_certified=True)
        session.add(skill2)
        session.add(Skill.new_skill('lpic', 2, is_certified=True))

        skill3 = Skill.new_skill('夜間統制', 5, is_certified=False)
        session.add(skill3)

        # add teams
        
        from workscheduler.domains.models.operator import TeamCategory
        
        team_cat_1 = TeamCategory.new_team_category(
            'Night Operation Team', allow_multiple_affiliation=True,
            is_leader_required=False, min_member_count=0,
            max_member_count=3
        )
        session.add(team_cat_1)
        team_cat_2 = TeamCategory.new_team_category(
            'Specific Operation Team', allow_multiple_affiliation=False,
            is_leader_required=True, min_member_count=1,
            max_member_count=10
        )
        session.add(team_cat_2)

        from workscheduler.domains.models.operator import Team
        
        team = Team.new_team('Team A', team_cat_1.id)
        session.add(team)
        user1 = append_user('test_user1', 'テストユーザ1', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user1)
        team = Team.new_team('Team B', team_cat_2.id)
        session.add(team)
        user2 = append_user('test_user2', 'テストユーザ2', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user2)
        user3 = append_user('test_user3', 'テストユーザ3', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user3)
        team.leader_user_id = user3.id
        team = Team.new_team('Team C', team_cat_2.id)
        session.add(team)
        user4 = append_user('test_user4', 'テストユーザ4', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user4)
        user5 = append_user('test_user5', 'テストユーザ5', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user5)
        user6 = append_user('test_user6', 'テストユーザ6', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user6)
        team.leader_user_id = user6.id
        team = Team.new_team('Team D', team_cat_2.id)
        session.add(team)
        user7 = append_user('test_user7', 'テストユーザ7', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user7)
        user8 = append_user('test_user8', 'テストユーザ8', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user8)
        user9 = append_user('test_user9', 'テストユーザ9', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user9)
        user10 = append_user('test_user10', 'テストユーザ10', affiliation_id, is_admin=False, is_operator=True)
        team.users.append(user10)
        team.leader_user_id = user10.id

        session.flush()

        # add scheduler
        
        from datetime import time
        
        from workscheduler.applications.services import OperatorQuery
        from workscheduler.applications.services import SchedulerQuery
        from workscheduler.domains.models.scheduler import WorkCategory

        get_operator_of_user_id = OperatorQuery(session).get_operator_of_user_id
        work_daily = WorkCategory.new_category('日勤帯', time(9, 30), time(18, 00), 7, 10, 3, 5, 0, 0, [],
                                               [get_operator_of_user_id(user1.id),
                                                get_operator_of_user_id(user2.id)],
                                               [])
        scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(front.id)
        scheduler.work_categories.append(work_daily)
        scheduler.work_categories.append(
            WorkCategory.new_category('夜間帯', time(17, 30), time(10, 00), 3, 5, 3, 5, 1, 5, [skill3], [],
                                      [get_operator_of_user_id(user3.id)])
        )
        session.flush()
        
        # add scheduler calendar

        from mypackages.utils.date import get_next_month
        from workscheduler.domains.models.scheduler import MonthlySetting

        next_month = get_next_month()
        monthly_setting = MonthlySetting.new_monthly_setting(scheduler.work_categories,
                                                             next_month.year, next_month.month)
        monthly_setting.is_published = True
        scheduler.monthly_settings.append(monthly_setting)
        session.commit()
        session.close()

    def create_session(self):
        session = sessionmaker(bind=self._engine, autocommit=False, autoflush=False)
        return session()

    def drop(self):
        OrmBase.metadata.drop_all(self._engine)
