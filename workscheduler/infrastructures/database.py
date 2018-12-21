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
        
        session.commit()
        session.close()

    def create_session(self):
        session = sessionmaker(bind=self._engine, autocommit=False, autoflush=False)
        return session()

    def drop(self):
        OrmBase.metadata.drop_all(self._engine)
