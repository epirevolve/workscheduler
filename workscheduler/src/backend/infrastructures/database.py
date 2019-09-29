# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from applications.services import UserFacade
from applications.services import UserQuery
from domains.models import OrmBase
from domains.models.user import Team
from domains.models.user import User
from domains.models.user import UserRole


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

        default_team = UserQuery(session).get_default_team()
        user_command = UserFacade(session)
        user_command.append_user(User.new('admin', '管理者', default_team, role=UserRole.ADMINISTRATOR))

        session.commit()
        session.close()

    def create_session(self):
        session = sessionmaker(bind=self._engine, autocommit=False, autoflush=False)
        return session()

    def drop(self):
        OrmBase.metadata.drop_all(self._engine)

    def set_test(self):
        self.init()

        session = self.create_session()

        # add teams
        team_facade = UserFacade(session)
        team1 = team_facade.append_team(Team.new('チーム１', ''))
        team_facade.append_team(Team.new('チーム２', ''))
        team_facade.append_team(Team.new('チーム３', ''))

        session.flush()

        # add users
        append_user = UserFacade(session).append_user
        append_user(User.new('user1', 'ユーザ１', team1, role=UserRole.OPERATOR))
        user1 = append_user(User.new('user2', 'ユーザ２', team1, role=UserRole.OPERATOR))
        user2 = append_user(User.new('user3', 'ユーザ３', team1, role=UserRole.OPERATOR))
        user3 = append_user(User.new('user4', 'ユーザ４', team1, role=UserRole.OPERATOR))

        session.flush()

        # add skills
        from domains.models.operator import Skill

        skill1 = Skill.new('スキル１', 1, is_certified=True)
        session.add(skill1)
        skill2 = Skill.new('スキル２', 3, is_certified=True)
        session.add(skill2)
        session.add(Skill.new('スキル３', 2, is_certified=True))
        skill3 = Skill.new('スキル４', 5, is_certified=False)
        session.add(skill3)

        # add scheduler

        from datetime import time

        from applications.services import OperatorQuery
        from applications.services import SchedulerQuery
        from domains.models.scheduler import WorkCategory

        get_operator_of_user_id = OperatorQuery(session).get_operator_of_user_id
        work_daily = WorkCategory.new('勤務帯１', time(9, 30), time(18, 00), 7, 3, 0, 0,
                                      [get_operator_of_user_id(user1.id), get_operator_of_user_id(user2.id)],
                                      [], [], [], [])
        scheduler = SchedulerQuery(session).get_scheduler_of_team_id(team1.id)
        scheduler.work_categories.append(work_daily)
        scheduler.work_categories.append(
            WorkCategory.new('勤務帯２', time(17, 30), time(10, 00), 3, 3, 1, 5,
                             [], [], [skill3], [], [get_operator_of_user_id(user3.id)])
        )
        session.flush()

        # add scheduler calendar

        from utils.date import get_next_month
        from domains.models.scheduler import MonthlySetting

        next_month = get_next_month()
        monthly_setting = MonthlySetting.new(scheduler.work_categories,
                                             next_month.month, next_month.year)
        monthly_setting.is_published = True
        scheduler.monthly_settings.append(monthly_setting)

        session.flush()

        session.commit()
        session.close()
