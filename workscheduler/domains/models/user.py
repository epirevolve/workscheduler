# -*- coding: utf-8 -*-

from domains.models.role import Role
from flask_login import UserMixin
from domains.models import Base
from sqlalchemy import Column, String


class User(UserMixin, Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    identifier = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    role_identifier = Column(String, nullable=False)
    
    def __init__(self,
                 identifier: str, login_id: str, password: str, name: str, role: Role):
        self.identifier = identifier
        self.login_id = login_id
        self.password = password
        self.name = name
        self.role_identifier = role.identifier
    
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.identifier
