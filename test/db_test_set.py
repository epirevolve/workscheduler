# -*- coding: utf-8 -*-

from infrastructures.sqlite_user_repository import UserRepository, SqliteUserRepository
from domains.models.role import RoleFactory
import inject
import os
import sqlite3


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
        def _connect_db(connect_string: str):
            """Connects to the specific database."""
            rv = sqlite3.connect(connect_string)
            rv.row_factory = sqlite3.Row
            return rv
        with _connect_db(self.get_db_path()) as db:
            with open(self.get_schema_path(), mode='r') as f:
                db.cursor().executescript(f.read())
            db.commit()
        user_repository = SqliteUserRepository(self.get_db_path())
        admin_role = RoleFactory.new_role('管理者', 1)
        user_repository.store_role(admin_role)
        operator_role = RoleFactory.new_role('オペレータ', 0)
        user_repository.store_role(operator_role)
        
        user_repository.append_user('admin', 'minAd', '管理者', admin_role.uuid)
        user_repository.append_user('user', 'user', 'ユーザ', operator_role.uuid)
