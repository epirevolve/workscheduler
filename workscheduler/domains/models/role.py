# -*- coding: utf-8 -*-

from typing import TypeVar
from workscheduler.domains.utility.uuid import UuidFactory
from workscheduler.domains.models import Base
from sqlalchemy import Column
from sqlalchemy.types import String, Boolean

AnyBool = TypeVar('AnyBool', bool, int)


class Role(Base):
    __tablename__ = 'roles'
    __table_args__ = {'extend_existing': True}
    identifier = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    
    def __init__(self, identifier: str, name: str, is_admin: AnyBool):
        self.identifier = identifier
        self.name = name
        self.is_admin = True if is_admin else False


class RoleFactory:
    @classmethod
    def new_role(cls, name: str, is_admin: AnyBool) -> Role:
        return Role(UuidFactory.new_uuid(), name, is_admin)
