# -*- coding: utf-8 -*-

from flask_login import UserMixin
from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.types import (
    String, DateTime, Boolean
)
from sqlalchemy.sql.functions import current_timestamp
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase


class User(OrmBase, UserMixin):
    __tablename__ = 'users'
    id = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    is_admin = Column(Boolean, default=False)
    is_operator = Column(Boolean, default=True)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, login_id: str, name: str,
                 is_admin: bool, is_operator: bool):
        self.id = id
        self.login_id = login_id
        self.password = 'p' + login_id
        self.name = name
        self.is_admin = is_admin
        self.is_operator = is_operator
    
    @validates('id', 'login_id', 'password', 'name')
    def validate(self, key, value):
        return super(User, self).validate(User, key, value)
    
    def reset_password(self):
        self.password = 'p' + self.login_id
    
    def get_id(self):
        return self.id


class UserFactory:
    @classmethod
    def join_a_member(cls, login_id: str, name: str, is_admin: bool, is_operator: bool) -> User:
        user = User(UuidFactory.new_uuid(), login_id, name, is_admin, is_operator)
        return user
