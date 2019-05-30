from datetime import time

from utils.date import get_next_month

from applications.services import OperatorQuery
from applications.services import SchedulerQuery
from domains.models.scheduler import WorkCategory
from applications.services import UserCommand
from applications.services import AffiliationQuery
from applications.services import AffiliationFacade
from domains.models.operator import Skill
from domains.models.scheduler import MonthlySetting

from .database import Database


class InputInitData(Database):
    def input_init_data(self):
        self.init()
        
        session = self.create_session()

        # add affiliations

        affiliation_facade = AffiliationFacade(session)
        front = affiliation_facade.append_affiliation('フロント', '')

        session.flush()

        # add skills

        skill1 = Skill.new('ccna', 1, is_certified=True)
        session.add(skill1)
        skill2 = Skill.new('ccnp', 3, is_certified=True)
        session.add(skill2)
        session.add(Skill.new('lpic', 2, is_certified=True))

        skill3 = Skill.new('夜間統制', 5, is_certified=False)
        session.add(skill3)
        
        # add users
        
        affiliation_id = AffiliationQuery(session).get_default_affiliation().id
        users = []
        user_command = UserCommand(session)
        operator_query = OperatorQuery(session)
        
        user_command.append_user('admin1', '井出 侑宏', affiliation_id, is_admin=True, is_operator=False)
        user_command.append_user('adope1', '管理ユーザ', affiliation_id, is_admin=True, is_operator=True)
        users.append(user_command.append_user('user3', '土屋 孝弘', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user18', '吉田 陽次郎', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user4', '小山内 智也', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user5', '島方 俊介', front.id, is_admin=False, is_operator=True))
        session.flush()
        operator = operator_query.get_operator_of_user_id(users[-1].id)
        operator.skills.append(skill3)
        users.append(user_command.append_user('user6', '小林 雅季', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user7', '葛田 哲郎', front.id, is_admin=False, is_operator=True))
        session.flush()
        operator = operator_query.get_operator_of_user_id(users[-1].id)
        operator.skills.append(skill3)
        users.append(user_command.append_user('user8', '曹 雄', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user9', '斉藤 颯斗', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user10', '渡辺 真', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user11', '森 万貴', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user12', '太田 夏美', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user13', '稲垣 晴美', front.id, is_admin=False, is_operator=True))
        session.flush()
        operator = operator_query.get_operator_of_user_id(users[-1].id)
        operator.skills.append(skill3)
        users.append(user_command.append_user('user14', '橋本 大貴', front.id, is_admin=False, is_operator=True))
        session.flush()
        operator = operator_query.get_operator_of_user_id(users[-1].id)
        operator.skills.append(skill3)
        users.append(user_command.append_user('user15', '里田 和希', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user16', 'モハマド マキ', front.id, is_admin=False, is_operator=True))
        session.flush()
        operator = operator_query.get_operator_of_user_id(users[-1].id)
        operator.skills.append(skill3)
        users.append(user_command.append_user('user17', '岸本 貴宗', front.id, is_admin=False, is_operator=True))
        session.flush()
        operator = operator_query.get_operator_of_user_id(users[-1].id)
        operator.skills.append(skill3)
        users.append(user_command.append_user('user19', '星野 フランク', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user20', 'ウパダャヤ アジャク クマル', front.id, is_admin=False, is_operator=True))
        users.append(user_command.append_user('user21', '山田 敏幸', front.id, is_admin=False, is_operator=True))
        
        session.flush()
        
        get_operator_of_user_id = OperatorQuery(session).get_operator_of_user_id
        work_daily = WorkCategory.new('日勤帯', time(9, 30), time(18, 00), 7, 10, 3, 5, 0, 0, [], [], [],
                                      [get_operator_of_user_id(users[0].id),
                                       get_operator_of_user_id(users[1].id)],
                                      [])
        scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(front.id)
        scheduler.work_categories.append(work_daily)
        scheduler.work_categories.append(
            WorkCategory.new('夜間帯', time(17, 30), time(10, 00), 3, 5, 3, 5, 1, 5, [], [], [skill3], [],
                             [get_operator_of_user_id(users[2].id)])
        )
        session.flush()

        # add scheduler calendar

        next_month = get_next_month()
        monthly_setting = MonthlySetting.new(scheduler.work_categories,
                                             next_month.year, next_month.month)
        monthly_setting.is_published = True
        scheduler.monthly_settings.append(monthly_setting)
        session.commit()
        session.close()
