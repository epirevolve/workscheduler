# -*- coding: utf-8 -*-

from domains.models.role import Role


class Operator:
    def __init__(self,
                 identify: int, name: str, role: Role,
                 relations_s: {int: int}=None, relations_o: {int: int}=None):
        self.id = identify
        self.name = name
        self.role = role
        self.relations_s = relations_s
        self.relations_o = relations_o
