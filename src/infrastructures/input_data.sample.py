# -*- coding: utf-8 -*-

from applications.backend.services import UserCommand
from domains.models.user import UserRole
from domains.models.user import User
from .database import Database


class InputData(Database):
    def set_test(self):
        self.init()

        session = self.create_session()

        # add teams

        from applications.backend.services import UserFacade

        team_facade = UserFacade(session)
        front = team_facade.append_team('フロント', '')
        team_facade.append_team('Sec', '')
        team_facade.append_team('Secフロント', '')

        session.flush()

        # add users

        append_user = UserCommand(session).append_user
        append_user(User.new('user', 'ユーザ', front.id, role=UserRole.OPERATOR))
        user1 = append_user(User.new('user2', 'ユーザ2', front.id, role=UserRole.OPERATOR))
        user2 = append_user(User.new('user3', 'ユーザ3', front.id, role=UserRole.OPERATOR))
        user3 = append_user(User.new('user4', 'ユーザ4', front.id, role=UserRole.OPERATOR))

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

        from applications.backend.services import OperatorQuery
        from applications.backend.services import SchedulerQuery
        from domains.models.scheduler import WorkCategory

        get_operator_of_user_id = OperatorQuery(session).get_operator_of_user_id
        work_daily = WorkCategory.new('日勤帯', time(9, 30), time(18, 00), 7, 3, 0, 0,
                                      [get_operator_of_user_id(user1.id), get_operator_of_user_id(user2.id)],
                                      [], [], [], [])
        scheduler = SchedulerQuery(session).get_scheduler_of_team_id(front.id)
        scheduler.work_categories.append(work_daily)
        scheduler.work_categories.append(
            WorkCategory.new('夜間帯', time(17, 30), time(10, 00), 3, 3, 1, 5,
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

    def set_init(self):
        pass
