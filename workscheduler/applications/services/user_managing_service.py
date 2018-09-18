# -*- coding: utf-8 -*-

from multipledispatch import dispatch
from workscheduler.infrastructures.user_repository import UserRepository
from workscheduler.domains.models.user import User, UserFactory


class UserManagingService:
    def __init__(self, session):
        self._session = session

    def _store(self, user):
        UserRepository(self._session).store_user(user)

    @dispatch(str, str, str, str)
    def store(self,
              login_id: str, password: str, name: str, role_identifier: str):
        self._store(UserFactory.new_user(login_id, password, name, role_identifier))

    @dispatch(str, str, str, str, str)
    def store(self,
              identifier: str, login_id: str, password: str, name: str, role_identifier: str):
        self._store(User(identifier, login_id, password, name, role_identifier))
