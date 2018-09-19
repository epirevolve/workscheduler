# -*- coding: utf-8 -*-

import pytest
from workscheduler.infrastructures.user_repository import UserRepository
from workscheduler.domains.models.relation import Relation
from workscheduler.applications.services.user_managing_service import UserManagingService


@pytest.fixture
def user_repository(session):
    user_repository = UserRepository(session)
    user_repository.append_relation(Relation('1', '1', '2', 0.8, '1'))
    return user_repository


@pytest.fixture
def user_managing_service(session):
    user_managing_service = UserManagingService(session)
    return user_managing_service
