# -*- coding: utf-8 -*-

from flask_login import UserMixin
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime
from sqlalchemy.types import Boolean

from utils.uuid import UuidFactory

from . import Team
from .. import OrmBase


class User(OrmBase, UserMixin):
    __tablename__ = 'users'
    id = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    _team_id = Column(String, ForeignKey('teams.id'))
    team = relationship("Team", uselist=False, lazy='subquery')
    is_admin = Column(Boolean, default=False)
    is_operator = Column(Boolean, default=True)
    is_inactivated = Column(Boolean, default=False)
    create_at = Column(DateTime, server_default=current_timestamp())

    def __init__(self, id: str, login_id: str, name: str,
                 team: Team, is_admin: bool, is_operator: bool,
                 is_inactivate: bool = False, **kwargs):
        self.id = id
        self.login_id = login_id
        self.password = 'p' + login_id
        self.name = name
        self.team = team
        self.is_admin = is_admin
        self.is_operator = is_operator
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
            is_admin: bool, is_operator: bool):
        user = User(UuidFactory.new_uuid(), login_id, name,
                    team, is_admin, is_operator)
        return user
    
    def __eq__(self, other):
        if other is None or not isinstance(other, User):
            return False
        return self.id == other.id
    
    def __hash__(self):
        return hash(self.id)
