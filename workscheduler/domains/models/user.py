# -*- coding: utf-8 -*-


class User:
    def __init__(self,
                 identify: int, login_id: str, password: str,
                 name: str, role: int):
        self.id = identify
        self.login_id = login_id
        self.password = password
        self.name = name
        self._role = role
    
    def is_admin(self):
        return self._role >= 8
