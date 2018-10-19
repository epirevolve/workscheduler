# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Database:
    def __init__(self, sql_connection, echo=False):
        self._engine = create_engine('sqlite:///{}'.format(sql_connection), echo=echo)

    def init(self):
        self.drop()
        from workscheduler.domains.models import Base
        Base.metadata.create_all(bind=self._engine)

        # set initial users and roles
        from workscheduler.domains.models.user import UserFactory

        session = self.create_session()

        session.add(UserFactory.join_a_member('admin', 'minAd', '管理者', is_admin=True, is_operator=False))
        session.add(UserFactory.join_a_member('user', 'user', 'ユーザ', is_admin=False, is_operator=True))
        
        session.commit()
        session.close()

    def create_session(self):
        session = sessionmaker(bind=self._engine, autocommit=False, autoflush=False)
        return session()

    def drop(self):
        import workscheduler.domains.models as models
        models.Base.metadata.drop_all(self._engine)
