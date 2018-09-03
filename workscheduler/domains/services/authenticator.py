# -*- coding: utf-8 -*-

from domains.models.operator import Operator
from domains.domain_register import DomainRegister


class Authenticator:
    def __init__(self, login_id: str, password: str):
        self._login_id = login_id
        self._password = password
    
    def _login_check(self, x) -> bool:
        return self._login_id == x.login_id and self._password == x.password
    
    def login(self) -> Operator:
        return next(filter(self._login_check, DomainRegister().user_repository.get_users()), None)
