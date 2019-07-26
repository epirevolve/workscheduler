# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.services import UserFacade
from backend.services import UserQuery
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
