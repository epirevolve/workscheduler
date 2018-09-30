# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Database:
    def __init__(self, sql_connection, echo=False):
        self._engine = create_engine(sql_connection, echo=echo)

    def init(self):
        self.drop()
        import workscheduler.domains.models as models
        models.Base.metadata.create_all(bind=self._engine)

        # set initial users and roles
        from workscheduler.domains.models.role import RoleFactory
        from workscheduler.domains.models.user import UserFactory
        from workscheduler.infrastructures.user_repository import UserRepository

        session = self.create_session()
        user_repository = UserRepository(session)

        admin_role = RoleFactory.new_role('管理者', is_admin=True)
        user_repository.store_role(admin_role)
        operator_role = RoleFactory.new_role('オペレータ', is_admin=False)
        user_repository.store_role(operator_role)

        user_repository.store_user(UserFactory.new_user('admin', 'minAd', '管理者', admin_role.id))
        user_repository.store_user(UserFactory.new_user('user', 'user', 'ユーザ', operator_role.id))

        session.commit()

    def create_session(self):
        session = sessionmaker(bind=self._engine)
        return session()

    def drop(self):
        import workscheduler.domains.models as models
        models.Base.metadata.drop_all(self._engine)
