# -*- coding: utf-8 -*-

import sqlite3
import os
import domains.domain_registry as registry
from domains.models.role import RoleFactory


class SqliteConnection:
    def __init__(self, connect_string: str):
        self.connect_string = connect_string

    def get_db(self):
        """Connects to the specific database."""
        rv = sqlite3.connect(self.connect_string)
        rv.row_factory = sqlite3.Row
        return rv

    @staticmethod
    def get_schema_path() -> str:
        return os.path.join(os.path.dirname(os.path.dirname(__file__)), 'sql/schema.sql')
    
    def init_db(self):
        with self.get_db() as db:
            with open(self.get_schema_path(), mode='r') as f:
                db.cursor().executescript(f.read())
            db.commit()
        
        # set initial users and roles
        user_repository = registry.DomainRegistry().user_repository
        
        admin_role = RoleFactory.new_role('管理者', is_admin=True)
        user_repository.store_role(admin_role)
        operator_role = RoleFactory.new_role('オペレータ', is_admin=False)
        user_repository.store_role(operator_role)

        user_repository.append_user('admin', 'minAd', '管理者', admin_role.uuid)
        user_repository.append_user('user', 'user', 'ユーザ', operator_role.uuid)
