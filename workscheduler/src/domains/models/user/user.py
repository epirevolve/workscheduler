# -*- coding: utf-8 -*-

import enum

from flask_login import UserMixin
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Boolean
from sqlalchemy.types import Enum

from utils.uuid import UuidFactory

from . import Team
from .. import OrmBase


class Role(enum.Enum):
    DEVELOPER = 1
    ADMINISTRATOR = 2
    OPERATOR = 3


class User(OrmBase, UserMixin):
    __tablename__ = 'users'
    id = Column(String(54), primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    _team_id = Column(String(54), ForeignKey('teams.id'))
    team = relationship("Team", uselist=False, lazy='immediate')
    role = Column(Enum(Role))
    is_inactivated = Column(Boolean, default=False)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, login_id: str, password: str,
                 name: str, team: Team, role: Role,
                 is_inactivate: bool = False, **kwargs):
        self.id = id
        self.login_id = login_id
        self.password = password
        self.name = name
        self.team = team
        self.role = role
        self.is_inactivated = is_inactivate

    @validates('id', 'login_id', 'password', 'name')
    def validate(self, key, value):
        return super(User, self).validate(User, key, value)
    
    def reset_password(self):
        self.password = 'p' + self.login_id
    
    def get_id(self):
        return self.id

    @staticmethod
    def new(login_id: str, name: str, team: Team,
            role: Role, **kwargs):
        user = User(UuidFactory.new_uuid(), login_id, 'p'+login_id,
                    name, team, role)
        return user
    
    def __eq__(self, other):
        if other is None or not isinstance(other, User):
            return False
        return self.id == other.id
    
    def __hash__(self):
        return hash(self.id)
