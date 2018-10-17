# -*- coding: utf-8 -*-

import pytest
from workscheduler.applications.services.user_managing_service import UserManagingService


@pytest.fixture
def user_managing_service(session):
    user_managing_service = UserManagingService(session)
    return user_managing_service
