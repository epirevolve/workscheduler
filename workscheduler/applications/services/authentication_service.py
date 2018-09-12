# -*- coding: utf-8 -*-

from domains.models.user import User
from infrastructures.user_repository import UserRepository


class AuthenticationService:
    def __init__(self, session):
        self._session = session
    
    def _login_check(self, login_id: str, password: str):
        return lambda x: login_id == x.login_id and password == x.password
    
    def login(self, login_id: str, password: str) -> User:
        return next(filter(self._login_check(login_id, password), UserRepository(self._session).get_users()), None)
