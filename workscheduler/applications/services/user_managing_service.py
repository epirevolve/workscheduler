# -*- coding: utf-8 -*-

from workscheduler.applications.services.user_query import UserQuery
from workscheduler.domains.models.user import UserFactory


class UserManagingService:
    def __init__(self, session):
        self._session = session
    
    def join_a_member(self, login_id: str, password: str, name: str, is_admin: bool, is_operator: bool):
        self._session.add(UserFactory.join_a_member(login_id, password, name, is_admin, is_operator))

    def renew_user(self, id: str, login_id: str, name: str, is_admin: bool, is_operator: bool):
        user = UserQuery(self._session).get_user(id)
        user.login_id = login_id
        user.name = name
        user.is_admin = is_admin
        user.is_operator = is_operator
