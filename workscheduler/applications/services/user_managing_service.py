# -*- coding: utf-8 -*-

from multipledispatch import dispatch
from workscheduler.infrastructures.user_repository import UserRepository
from workscheduler.domains.models.user import User, UserFactory


class UserManagingService:
    def __init__(self, session):
        self._session = session

    def _store(self, user):
        UserRepository(self._session).store_user(user)

    @dispatch(str, str, str, bool, bool)
    def store(self,
              login_id: str, password: str, name: str, is_admin: bool, is_operator: bool):
        self._store(UserFactory.new_user(login_id, password, name, is_admin, is_operator))

    @dispatch(str, str, str, str, bool, bool)
    def store(self, id: str, login_id: str, password: str, name: str, is_admin: bool, is_operator: bool):
        self._store(User(id, login_id, password, name, is_admin, is_operator))
