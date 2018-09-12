# -*- coding: utf-8 -*-

from abc import ABCMeta
from infrastructures.db_connection import SessionContextFactory


class SqliteRepository(metaclass=ABCMeta):
    def __init__(self, connect_string: str):
        self.sc_factory = SessionContextFactory(connect_string)
        
    def _fetch_all(self, sql: str, *args):
        with self.sc_factory.get_db() as db:
            cur = db.execute(sql, args)
            return cur.fetchall()
    
    def _fetch_one(self, sql: str, *args):
        with self.sc_factory.get_db() as db:
            cur = db.execute(sql, args)
            return cur.fetchone()
    
    def _execute(self, sql: str, *args, commit=False):
        with self.sc_factory.get_db() as db:
            try:
                db.execute(sql, args)
            except Exception as e:
                db.rollback()
            else:
                if commit:
                    db.commit()
