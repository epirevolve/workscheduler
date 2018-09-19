# -*- coding: utf-8 -*-

from workscheduler.applications.web import create_app


class TestConfig:
    def test_config(self):
        assert not create_app().testing
        assert create_app({'TESTING': True}).testing
    
