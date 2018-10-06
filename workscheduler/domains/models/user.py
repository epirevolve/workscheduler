# -*- coding: utf-8 -*-

from workscheduler.domains.utility.uuid import UuidFactory
from workscheduler.domains.models import Base
from flask_login import UserMixin
from sqlalchemy import Column
from sqlalchemy.types import String, DateTime, Boolean
from sqlalchemy.sql.functions import current_timestamp


class User(UserMixin, Base):
    __tablename__ = 'users'
    id = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    is_admin = Column(Boolean, default=False)
    is_operator = Column(Boolean, default=True)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self,
                 id: str, login_id: str, password: str, name: str, is_admin: bool, is_operator: bool):
        self.id = id
        self.login_id = login_id
        self.password = password
        self.name = name
        self.is_admin = is_admin
        self.is_operator = is_operator

    def get_id(self):
        return self.id


class UserFactory:
    @classmethod
    def new_user(cls, login_id: str, password: str, name: str, is_admin: bool, is_operator: bool) -> User:
        return User(UuidFactory.new_uuid(), login_id, password, name, is_admin, is_operator)
