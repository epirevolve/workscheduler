# -*- coding: utf-8 -*-

from workscheduler.domains.utility.uuid import UuidFactory
from workscheduler.domains.models import Base
from flask_login import UserMixin
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, DateTime
from sqlalchemy.sql.functions import current_timestamp


class User(UserMixin, Base):
    __tablename__ = 'users'
    id = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    role_id = Column(String, ForeignKey('roles.id'))
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self,
                 id: str, login_id: str, password: str, name: str, role_id: str):
        self.id = id
        self.login_id = login_id
        self.password = password
        self.name = name
        self.role_id = role_id

    def get_id(self):
        return self.id


class UserFactory:
    @classmethod
    def new_user(cls, login_id: str, password: str, name: str, role_id: str) -> User:
        return User(UuidFactory.new_uuid(), login_id, password, name, role_id)
