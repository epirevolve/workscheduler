# -*- coding: utf-8 -*-

from typing import TypeVar
from workscheduler.domains.utility.uuid import UuidFactory
from workscheduler.domains.models import Base
from sqlalchemy import Column
from sqlalchemy.types import String, Boolean

AnyBool = TypeVar('AnyBool', bool, int)


class Role(Base):
    __tablename__ = 'roles'
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    is_operator = Column(Boolean, default=True)

    def __init__(self, id: str, name: str, is_admin: AnyBool):
        self.id = id
        self.name = name
        self.is_admin = True if is_admin else False


class RoleFactory:
    @classmethod
    def new_role(cls, name: str, is_admin: AnyBool) -> Role:
        return Role(UuidFactory.new_uuid(), name, is_admin)
