# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from applications.services import UserCommand
from applications.services import TeamQuery
from domains.models import OrmBase
from domains.models.user import Team


class Database:
    def __init__(self, sql_connection, echo=False):
        self._engine = create_engine(sql_connection, echo=echo)

    def init(self):
        self.drop()
        OrmBase.metadata.create_all(bind=self._engine)

        # set initial data
        session = self.create_session()
        
        # default team is directly added
        # usual team is added by facade and make scheduler inside facade
        session.add(Team.default())
        session.flush()

        default_id = TeamQuery(session).get_default_team().id
        user_command = UserCommand(session)
        user_command.append_user('admin', '管理者', default_id, is_admin=True, is_operator=False)

        session.commit()
        session.close()

    def set_test(self):
        self.init()

        session = self.create_session()

        # add teams
        
        from applications.services import TeamFacade
        
        team_facade = TeamFacade(session)
        front = team_facade.append_team('フロント', '')
        team_facade.append_team('Sec', '')
        team_facade.append_team('Secフロント', '')
        
        session.flush()

        # add users

        append_user = UserCommand(session).append_user
        append_user('user', 'ユーザ', front.id, is_admin=False, is_operator=True)
        append_user('adope', '管理ユーザ', front.id, is_admin=True, is_operator=True)
        user1 = append_user('user2', 'ユーザ2', front.id, is_admin=False, is_operator=True)
        user2 = append_user('user3', 'ユーザ3', front.id, is_admin=False, is_operator=True)
        user3 = append_user('user4', 'ユーザ4', front.id, is_admin=False, is_operator=True)

        # add skills
        
        from domains.models.operator import Skill
        
        skill1 = Skill.new('ccna', 1, is_certified=True)
        session.add(skill1)
        skill2 = Skill.new('ccnp', 3, is_certified=True)
        session.add(skill2)
        session.add(Skill.new('lpic', 2, is_certified=True))

        skill3 = Skill.new('夜間統制', 5, is_certified=False)
        session.add(skill3)

        # add scheduler
        
        from datetime import time
        
        from applications.services import OperatorQuery
        from applications.services import SchedulerQuery
        from domains.models.scheduler import WorkCategory
        
        get_operator_of_user_id = OperatorQuery(session).get_operator_of_user_id
        work_daily = WorkCategory.new('日勤帯', time(9, 30), time(18, 00), 7, 10, 3, 5, 0, 0,
                                      [get_operator_of_user_id(user1.id), get_operator_of_user_id(user2.id)],
                                      [], [], [], [])
        scheduler = SchedulerQuery(session).get_scheduler_of_team_id(front.id)
        scheduler.work_categories.append(work_daily)
        scheduler.work_categories.append(
            WorkCategory.new('夜間帯', time(17, 30), time(10, 00), 3, 5, 3, 5, 1, 5,
                             [], [], [skill3], [], [get_operator_of_user_id(user3.id)])
        )
        session.flush()
        
        # add scheduler calendar

        from utils.date import get_next_month
        from domains.models.scheduler import MonthlySetting

        next_month = get_next_month()
        monthly_setting = MonthlySetting.new(scheduler.work_categories,
                                             next_month.year, next_month.month)
        monthly_setting.is_published = True
        scheduler.monthly_settings.append(monthly_setting)
        
        session.flush()

        session.commit()
        session.close()

    def create_session(self):
        session = sessionmaker(bind=self._engine, autocommit=False, autoflush=False)
        return session()

    def drop(self):
        OrmBase.metadata.drop_all(self._engine)
