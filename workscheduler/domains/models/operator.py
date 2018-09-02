# -*- coding: utf-8 -*-


class Operator:
    def __init__(self,
                 identify: int, name: str, role: int,
                 relations_s: {int: int}=None, relations_o: {int: int}=None):
        self.id = identify
        self.name = name
        self._role = role
        self.relations_s = relations_s
        self.relations_o = relations_o
    
    def is_admin(self):
        return self._role >= 8
