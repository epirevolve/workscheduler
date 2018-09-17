# -*- coding: utf-8 -*-

from applications.services.user_managing_service import UserManagingService
from workscheduler.infrastructures.user_repository import UserRepository
from test.db_test_set import DbTestSetting
from infrastructures.db_connection import SessionContextFactory


class TestUserManagingService:
    @classmethod
    def setup_class(cls):
        setting = DbTestSetting()
        cls.session = SessionContextFactory(setting.get_db_path()).create().session
        cls.user_repository = UserRepository(setting.get_db_path())
        setting.sqlite_db_initialize(cls.session)

    @classmethod
    def teardown_class(cls):
        cls.session.close()
    
    def test_store_new_user(self):
        user_managing_service = UserManagingService(self.session)
        user_managing_service.store('test', 'test', 'test', 'test', '8')
        user_managing_service.store('test', 'test', 'test', '9')
