# -*- coding: utf-8 -*-

import pytest
from workscheduler.infrastructures.user_query import UserRepository
from workscheduler.domains.models.relation import Relation
from workscheduler.applications.services.user_managing_service import UserManagingService


@pytest.fixture
def user_managing_service(session):
    user_managing_service = UserManagingService(session)
    return user_managing_service
