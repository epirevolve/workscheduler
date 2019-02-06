# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import Operator
from workscheduler.domains.models.user import User
from . import AffiliationQuery
from . import UserQuery


class UserCommand:
    def __init__(self, session):
        self._session = session
    
    def update_myself(self, id_: str, password: str, name: str):
        user = UserQuery(self._session).get_user(id_)
        user.password = password
        user.name = name
    
    def append_user(self, login_id: str, name: str,
                    affiliation_id: str, is_admin: bool, is_operator: bool):
        affiliation = AffiliationQuery(self._session).get_affiliation(affiliation_id)
        user = User.new_member(login_id, name, affiliation, is_admin, is_operator)
        self._session.add(user)
        self._session.add(Operator.new_operator(user))
        return user
    
    def update_user(self, id_: str, login_id: str, name: str,
                    affiliation_id: str, is_admin: bool, is_operator: bool):
        user = UserQuery(self._session).get_user(id_)
        user.login_id = login_id
        user.name = name
        user.affiliation = AffiliationQuery(self._session).get_affiliation(affiliation_id)
        user.is_admin = is_admin
        user.is_operator = is_operator
    
    def reset_password(self, id_: str):
        user = UserQuery(self._session).get_user(id_)
        user.reset_password()

    def inactivate(self, id_: str):
        user = UserQuery(self._session).get_user(id_)
        user.is_inactivated = True
