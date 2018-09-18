# -*- coding: utf-8 -*-

import pytest
from workscheduler.infrastructures.user_repository import UserRepository
from workscheduler.domains.models.relation import Relation


@pytest.fixture
def user_repository(session):
    user_repository = UserRepository(session)
    user_repository.append_relation(Relation('1', '1', '2', 0.8, '1'))
    return user_repository
