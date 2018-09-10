# -*- coding: utf-8 -*-

from abc import ABCMeta
from infrastructures.sqlite_connection import SqliteConnection


class SqliteRepository(metaclass=ABCMeta):
    def __init__(self, connect_string: str):
        self.con = SqliteConnection(connect_string)
    
    def _execute_sql(self, sql: str, *args):
        with self.con.get_db() as db:
            cur = db.execute(sql, args)
            return cur.fetchall()
