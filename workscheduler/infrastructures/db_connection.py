# -*- coding: utf-8 -*-

from workscheduler.infrastructures.user_repository import UserRepository
from workscheduler.domains.models.role import RoleFactory
from workscheduler.domains.models.user import UserFactory
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from workscheduler.domains.models import Base


class SessionFactory(object):
    def __init__(self, sql_connection, echo=False):
        self.engine = create_engine(sql_connection, echo=echo)
        Base.metadata.create_all(self.engine)

    def create(self):
        session = sessionmaker(bind=self.engine)
        return session()


class SessionContext(object):
    def __init__(self, session):
        self.session = session

    def __enter__(self):
        return self.session

    def __exit__(self, exc_type, exc_value, traceback):
        self.session.flush()
        self.session.commit()
        self.session.close()


class SessionContextFactory(object):
    def __init__(self, sql_connection, echo=False):
        self.session_factory = SessionFactory(sql_connection, echo)

    def create(self):
        return SessionContext(self.session_factory.create())


class DbConnection:
    def init_db(self, session):
        # set initial users and roles
        user_repository = UserRepository(session)
        
        admin_role = RoleFactory.new_role('管理者', is_admin=True)
        user_repository.store_role(admin_role)
        operator_role = RoleFactory.new_role('オペレータ', is_admin=False)
        user_repository.store_role(operator_role)

        user_repository.store_user(UserFactory.new_user('admin', 'minAd', '管理者', admin_role.identifier))
        user_repository.store_user(UserFactory.new_user('user', 'user', 'ユーザ', operator_role.identifier))
