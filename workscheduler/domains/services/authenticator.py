# -*- coding: utf-8 -*-

from domains.models.user import User
from domains.domain_registry import DomainRegistry


class Authenticator:
    def __init__(self, login_id: str, password: str):
        self._login_id = login_id
        self._password = password
    
    def _login_check(self, x) -> bool:
        return self._login_id == x.login_id and self._password == x.password
    
    def login(self) -> User:
        return next(filter(self._login_check, DomainRegistry().user_repository.get_users()), None)
