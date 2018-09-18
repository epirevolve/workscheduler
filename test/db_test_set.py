# -*- coding: utf-8 -*-

from workscheduler.infrastructures.db_connection import DbConnection
import os


class DbTestSetting:
    @staticmethod
    def get_db_path() -> str:
        return 'sqlite://'

    @staticmethod
    def get_schema_path() -> str:
        return os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'workscheduler/sql/schema.sql'))
    
    @staticmethod
    def sqlite_db_initialize(session):
        DbConnection().init_db(session)
        session.commit()
