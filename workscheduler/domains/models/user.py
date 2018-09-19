# -*- coding: utf-8 -*-

from workscheduler.domains.utility.uuid import UuidFactory
from workscheduler.domains.models import Base
from flask_login import UserMixin
from sqlalchemy import Column
from sqlalchemy.types import String


class User(UserMixin, Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    identifier = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    role_identifier = Column(String, nullable=False)
    
    def __init__(self,
                 identifier: str, login_id: str, password: str, name: str, role_identifier: str):
        self.identifier = identifier
        self.login_id = login_id
        self.password = password
        self.name = name
        self.role_identifier = role_identifier
    
    def get_id(self):
        return self.identifier


class UserFactory:
    @classmethod
    def new_user(cls, login_id: str, password: str, name: str, role_identifier: str) -> User:
        return User(UuidFactory.new_uuid(), login_id, password, name, role_identifier)
