# -*- coding: utf-8 -*-

from domains.models.role import Role
from flask_login import UserMixin


class User(UserMixin):
    def __init__(self,
                 identify: int, login_id: str, password: str, name: str, role: Role):
        self.id = identify
        self.login_id = login_id
        self.password = password
        self.name = name
        self.role = role
    
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id
