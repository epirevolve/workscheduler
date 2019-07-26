# -*- coding: utf-8 -*-

import pytest

import src.utils.jsonize as jsonize

from src.applications.backend.adapters import UserCommandAdapter
from src.applications.backend.services import UserQuery
from src.domains.models.user import User
from src.domains.models.user import Team


class TestUserCommandAdapter:
    def test_save_user_update(self, session):
        adapter = UserCommandAdapter(session)
        query = UserQuery(session)

    def test_activate_user(self, session):
        pass

    def test_inactivate_user(self, session):
        pass

    def test_reset_user_password(self, session):
        pass

    def test_save_team(self, session):
        pass

    def test_remove_team(self, session):
        pass
