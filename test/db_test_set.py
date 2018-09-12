# -*- coding: utf-8 -*-

from infrastructures.db_connection import DbConnection, SessionContextFactory
import os


class DbTestSetting:
    @staticmethod
    def get_db_path() -> str:
        return 'sqlite://'

    @staticmethod
    def get_schema_path() -> str:
        return os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'workscheduler/sql/schema.sql'))
    
    def sqlite_db_initialize(self, session):
        DbConnection().init_db(session)
        session.commit()
