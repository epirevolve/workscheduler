# -*- coding: utf-8 -*-

from typing import TypeVar

AnyBool = TypeVar('AnyBool', bool, int)


class Role:
    def __init__(self, identify: int, name: str, is_admin: AnyBool):
        self.id = identify
        self.name = name
        self.is_admin = True if is_admin else False
