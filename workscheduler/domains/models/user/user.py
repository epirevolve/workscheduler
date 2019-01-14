# -*- coding: utf-8 -*-

from flask_login import UserMixin
from sqlalchemy import (
    Column, ForeignKey
)
from sqlalchemy.orm import (
    relationship, validates
)
from sqlalchemy.types import (
    String, DateTime, Boolean
)
from sqlalchemy.sql.functions import current_timestamp
from utils.uuid import UuidFactory
from .. import OrmBase
from . import Belong


class User(OrmBase, UserMixin):
    __tablename__ = 'users'
    id = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    _belong_id = Column(String, ForeignKey('belongs.id'))
    belong = relationship("Belong", uselist=False)
    is_admin = Column(Boolean, default=False)
    is_operator = Column(Boolean, default=True)
    is_inactivated = Column(Boolean, default=False)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, login_id: str, name: str,
                 belong: Belong, is_admin: bool, is_operator: bool):
        self.id = id
        self.login_id = login_id
        self.password = 'p' + login_id
        self.name = name
        self.belong = belong
        self.is_admin = is_admin
        self.is_operator = is_operator
        self.is_inactivated = False

    @validates('id', 'login_id', 'password', 'name')
    def validate(self, key, value):
        return super(User, self).validate(User, key, value)
    
    def reset_password(self):
        self.password = 'p' + self.login_id
    
    def get_id(self):
        return self.id

    @staticmethod
    def new_member(login_id: str, name: str, belong: Belong,
                   is_admin: bool, is_operator: bool):
        user = User(UuidFactory.new_uuid(), login_id, name,
                    belong, is_admin, is_operator)
        return user
