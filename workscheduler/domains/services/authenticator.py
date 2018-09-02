# -*- coding: utf-8 -*-

from infrastructures.sqlite_user_repository import get_users
from domains.models.operator import Operator


class Authenticator:
    def __init__(self, user_id: str, user_password: str):
        self._user_id = user_id
        self._user_password = user_password
    
    def _login_check(self, x) -> bool:
        return self._user_id == x.name and self._user_password == x.password
    
    def login(self) -> Operator:
        return next(filter(self._login_check, get_users()), None)
