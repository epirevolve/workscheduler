# -*- coding: utf-8 -*-

import sqlite3


class SqliteConnection:
    def __init__(self, connect_string: str):
        self.connect_string = connect_string

    def get_db(self):
        """Connects to the specific database."""
        rv = sqlite3.connect(self.connect_string)
        rv.row_factory = sqlite3.Row
        return rv
