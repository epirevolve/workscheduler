# -*- coding: utf-8 -*-
import workscheduler.applications.web.db as db
import os


class DbTestSetting:
    @staticmethod
    def get_db_path() -> str:
        return 'sqlite://'

    @staticmethod
    def get_schema_path() -> str:
        return os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'workscheduler/sql/schema.sql'))
    
    @staticmethod
    def init_db(session):
        db.init_db(session)
