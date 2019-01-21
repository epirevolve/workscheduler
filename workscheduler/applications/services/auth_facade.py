# -*- coding: utf-8 -*-

from workscheduler.applications.services import UserQuery
from workscheduler.domains.models.user import User


class AuthFacade:
    def __init__(self, session):
        self._session = session
    
    @staticmethod
    def _login_check(login_id: str, password: str):
        def _inner(x: User):
            return login_id == x.login_id and password == x.password and not x.is_inactivated
        return _inner
    
    def login(self, login_id: str, password: str) -> User:
        _login_check = self._login_check(login_id, password)
        return next((x for x in UserQuery(self._session).get_users() if _login_check(x)), None)
