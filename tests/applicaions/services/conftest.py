# -*- coding: utf-8 -*-

import pytest
from workscheduler.applications.services import UserManageCommand


@pytest.fixture
def user_manage_command(session):
    user_manage_command = UserManageCommand(session)
    return user_manage_command
