# -*- coding: utf-8 -*-

from multipledispatch import dispatch
from infrastructures.user_repository import UserRepository
from domains.models.user import User, UserFactory


class UserManagingService:
    def __init__(self, session):
        self._session = session

    @dispatch(str, str, str, str)
    def store(self,
              login_id: str, password: str, name: str, role_identifier: str):
        UserRepository(self._session).store_user(UserFactory.new_user(login_id, password, name, role_identifier))

    @dispatch(str, str, str, str, str)
    def store(self,
              identifier: str, login_id: str, password: str, name: str, role_idenitfier: str):
        UserRepository(self._session).store_user(User(identifier, login_id, password, name, role_idenitfier))
