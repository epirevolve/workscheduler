# -*- coding: utf-8 -*-


class Relation:
    def __init__(self,
                 identifier: int, user_1: int, user_2: int,
                 affinity: float, looked_by: int):
        self.identifier = identifier
        self.user_1 = user_1
        self.user_2 = user_2
        self.affinity = affinity
        self.looked_by = looked_by
