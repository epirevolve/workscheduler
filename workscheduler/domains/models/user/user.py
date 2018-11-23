# -*- coding: utf-8 -*-

from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import Base
from flask_login import UserMixin
from sqlalchemy import Column, Table, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import String, DateTime, Boolean
from sqlalchemy.sql.functions import current_timestamp


association_table\
    = Table("association", Base.metadata,
            Column('left_id', String, ForeignKey('users.id')),
            Column('right_id', String, ForeignKey('skills.id'))
            )


class User(UserMixin, Base):
    __tablename__ = 'users'
    id = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    is_admin = Column(Boolean, default=False)
    is_operator = Column(Boolean, default=True)
    create_at = Column(DateTime, server_default=current_timestamp())
    skills = relationship("Skill", secondary=association_table)

    def __init__(self, id: str, login_id: str, password: str,
                 name: str, is_admin: bool, is_operator: bool):
        self.id = id
        self.login_id = login_id
        self.password = password
        self.name = name
        self.is_admin = is_admin
        self.is_operator = is_operator
    
    def reset_password(self):
        self.password = 'p' + self.login_id
    
    def get_id(self):
        return self.id


class UserFactory:
    @classmethod
    def join_a_member(cls, login_id: str, password: str, name: str, is_admin: bool, is_operator: bool) -> User:
        return User(UuidFactory.new_uuid(), login_id, password, name, is_admin, is_operator)
