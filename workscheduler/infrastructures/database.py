# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from workscheduler.applications.services import UserCommand
from workscheduler.domains.models import OrmBase


class Database:
    def __init__(self, sql_connection, echo=False):
        self._engine = create_engine('sqlite:///{}'.format(sql_connection), echo=echo)

    def init(self):
        self.drop()
        OrmBase.metadata.create_all(bind=self._engine)

        # set initial data
        session = self.create_session()
        
        user_command = UserCommand(session)
        user_command.append_user('admin', '管理者', is_admin=True, is_operator=False)
        user_command.append_user('user', 'ユーザ', is_admin=False, is_operator=True)
        user_command.append_user('adope', '管理ユーザ', is_admin=True, is_operator=True)
        
        # sample data
        from workscheduler.domains.models.operator.skill import SkillFactory
        session.add(SkillFactory.evaluate_a_skill('ccna', 1))
        session.add(SkillFactory.evaluate_a_skill('ccnp', 3))
        session.add(SkillFactory.evaluate_a_skill('lpic', 2))
        
        session.commit()
        session.close()

    def create_session(self):
        session = sessionmaker(bind=self._engine, autocommit=False, autoflush=False)
        return session()

    def drop(self):
        OrmBase.metadata.drop_all(self._engine)
