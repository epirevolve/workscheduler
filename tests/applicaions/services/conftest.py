# -*- coding: utf-8 -*-

import pytest

from workscheduler.applications.services import UserCommand


@pytest.fixture
def user_manage_command(session):
    user_manage_command = UserCommand(session)
    return user_manage_command
