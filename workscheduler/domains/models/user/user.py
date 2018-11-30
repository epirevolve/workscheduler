# -*- coding: utf-8 -*-

from mypackages.domainevent import (
    Event, Publisher
)
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models import (
    OrmBase, ValidateBase
)
from flask_login import UserMixin
from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.orm import (
    relationship, validates
)
from sqlalchemy.types import (
    String, DateTime, Boolean
)
from sqlalchemy.sql.functions import current_timestamp


association_table\
    = Table("association", OrmBase.metadata,
            Column('left_id', String, ForeignKey('users.id')),
            Column('right_id', String, ForeignKey('skills.id'))
            )


class UserEvent(Event):
    def __init__(self, id, before, after, event_version=0, event_message="", timestamp=None):
        super(UserEvent, self).__init__(event_version, event_message, timestamp)
        self.id = id
        self.before = before
        self.after = after


class NewUserJoined(UserEvent):
    pass


class UserInfoUpdated(UserEvent):
    pass


class User(UserMixin, OrmBase, ValidateBase):
    __tablename__ = 'users'
    id = Column(String, primary_key=True)
    login_id = Column(String(16), nullable=False)
    password = Column(String(16), nullable=False)
    name = Column(String(50), nullable=False)
    is_admin = Column(Boolean, default=False)
    is_operator = Column(Boolean, default=True)
    create_at = Column(DateTime, server_default=current_timestamp())
    skills = relationship("Skill", secondary=association_table)

    def __init__(self, id: str, login_id: str, name: str,
                 is_admin: bool, is_operator: bool):
        if not id or not login_id or not name:
            raise ValueError('mandatory field is empty')
        self.id = id
        self.login_id = login_id
        self.password = 'p' + login_id
        self.name = name
        self.is_admin = is_admin
        self.is_operator = is_operator
        self.skills = []
    
    @validates('id', 'login_id', 'password', 'name')
    def validate(self, key, value):
        return super(User, self).validate(User, key, value)
    
    def begin_event(self, before, message):
        def end_event(after):
            return UserInfoUpdated(self.id, before, after, event_message=message)
        return end_event
    
    def change_login_id(self, login_id: str):
        event = self.begin_event(self.login_id, "login id is changed")
        self.login_id = login_id
        Publisher.publish(event(self.login_id))
        
    def change_password(self, password: str):
        event = self.begin_event(self.password, "password is changed")
        self.password = password
        Publisher.publish(event(self.password))
        
    def change_name(self, name: str):
        event = self.begin_event(self.name, "name is changed")
        self.name = name
        Publisher.publish(event(self.name))

    def elevate_role(self, is_admin: bool, is_operator: bool):
        self.is_admin = is_admin
        self.is_operator = is_operator
        Publisher.publish(UserInfoUpdated(self.id, None, None, event_message="user role is elevated"))
    
    def change_skills(self, skills: []):
        self.skills = skills
    
    def reset_password(self):
        event = self.begin_event(self.password, "password is reset")
        self.password = 'p' + self.login_id
        Publisher.publish(event(self.password))
    
    def get_id(self):
        return self.id


class UserFactory:
    @classmethod
    def join_a_member(cls, login_id: str, name: str, is_admin: bool, is_operator: bool) -> User:
        user = User(UuidFactory.new_uuid(), login_id, name, is_admin, is_operator)
        Publisher.publish(NewUserJoined(user.id, None, user))
        return user
