# -*- coding: utf-8 -*-

import sqlite3
import pytest
from workscheduler.applications.web import get_db_session


class TestDb:
    def sstest_get_close_db(self, app):
        with app.app_context():
            db = get_db_session()
            assert db is get_db_session()
    
        with pytest.raises(sqlite3.ProgrammingError) as e:
            db.add('SELECT 1')
    
        assert 'closed' in str(e)
