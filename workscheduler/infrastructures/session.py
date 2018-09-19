# -*- coding: utf-8 -*-

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
    
    def drop(self):
        Base.metadata.drop_all(self.engine)


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
