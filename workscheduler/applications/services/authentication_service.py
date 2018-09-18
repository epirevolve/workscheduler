# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import User
from workscheduler.domains.models.role import Role
from workscheduler.infrastructures.user_repository import UserRepository


class AuthenticationService:
    def __init__(self, session):
        self._session = session
    
    @staticmethod
    def _login_check(login_id: str, password: str):
        def _wapper(x):
            user, _ = x
            return login_id == user.login_id and password == user.password
        return _wapper
    
    def login(self, login_id: str, password: str) -> (User, Role):
        _login_check = self._login_check(login_id, password)
        return next((x for x in UserRepository(self._session).get_users() if _login_check(x)), (None, None))
