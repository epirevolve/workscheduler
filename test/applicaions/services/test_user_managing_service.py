# -*- coding: utf-8 -*-

from workscheduler.applications.services.user_managing_service import UserManagingService


class TestUserManagingService:
    def test_store_new_user(self, session):
        user_managing_service = UserManagingService(session)
        user_managing_service.store('test', 'test', 'test', 'test', '8')
        user_managing_service.store('test', 'test', 'test', '9')
