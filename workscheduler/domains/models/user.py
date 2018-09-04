# -*- coding: utf-8 -*-

from domains.models.role import Role


class User:
    def __init__(self,
                 identify: int, login_id: str, password: str, name: str, role: Role):
        self.id = identify
        self.login_id = login_id
        self.password = password
        self.name = name
        self.role = role
