# -*- coding: utf-8 -*-

from applications.services.user_managing_service import UserManagingService
from workscheduler.infrastructures.user_repository import UserRepository
from test.db_test_set import DbTestSetting


class TestUserManagingService:
    @classmethod
    def setup_class(cls):
        setting = DbTestSetting()
        cls.user_repository = UserRepository(setting.get_db_path())
        setting.sqlite_db_initialize()
    
    def test_store_new_user(self):
        user_managing_service = UserManagingService()
        user_managing_service.store('test', 'test', 'test', 'test', 8)
