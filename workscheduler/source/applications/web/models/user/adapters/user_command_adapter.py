# -*- coding: utf-8 -*-

from applications.services import UserCommand


class UserCommandAdapter:
    def __init__(self, session):
        self._session = session
    
    def update_myself(self, data):
        return UserCommand(self._session).update_myself(
            data.get('id'), data.get('password'), data.get('name')
        )
    
    def append_user(self, data: dict):
        return UserCommand(self._session).append_user(
            data.get('login_id'), data.get('name'), data.get('affiliation').get('id'),
            data.get('is_admin'), data.get('is_operator')
        )
    
    def update_user(self, data: dict):
        return UserCommand(self._session).update_user(
            data.get('id'), data.get('login_id'), data.get('name'),
            data.get('affiliation').get('id'), data.get('is_admin'), data.get('is_operator')
        )
    
    def reset_password(self, id_):
        return UserCommand(self._session).reset_password(id_)

    def inactivate(self, id_):
        return UserCommand(self._session).inactivate(id_)
