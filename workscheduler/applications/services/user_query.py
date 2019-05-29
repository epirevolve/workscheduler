# -*- coding: utf-8 -*-

from domains.models.user import User


class UserQuery:
    def __init__(self, session):
        self._session = session
    
    def get_user(self, id_: str) -> User:
        return self._session.query(User).get(id_)

    def get_users(self) -> [User]:
        return self._session.query(User).order_by(User.id).all()
