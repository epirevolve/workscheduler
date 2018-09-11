# -*- coding: utf-8 -*-

from typing import TypeVar
from domains.utility.uuid import UuidFactory

AnyBool = TypeVar('AnyBool', bool, int)


class Role:
    def __init__(self, identifier: str, name: str, is_admin: AnyBool):
        self.identifier = identifier
        self.name = name
        self.is_admin = True if is_admin else False


class RoleFactory:
    @classmethod
    def new_role(cls, name: str, is_admin: AnyBool) -> Role:
        return Role(UuidFactory.new_uuid(), name, is_admin)
