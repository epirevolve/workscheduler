# -*- coding: utf-8 -*-

from infrastructures.sqlite_user_repository import UserRepository, SqliteUserRepository
from infrastructures.sqlite_connection import SqliteConnection
import inject
import os


class DbTestSetting:
    @staticmethod
    def get_db_path() -> str:
        return os.path.abspath(os.path.join(os.path.dirname(__file__), 'test_workscheduler.db'))

    @staticmethod
    def get_schema_path() -> str:
        return os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'workscheduler/sql/schema.sql'))

    def inject_as_test(self):
        def config(binder):
            binder.bind(UserRepository, SqliteUserRepository(self.get_db_path()))
        
        inject.clear()
        inject.configure(config)
    
    def sqlite_db_initialize(self):
        self.inject_as_test()
        SqliteConnection(self.get_db_path()).init_db()
