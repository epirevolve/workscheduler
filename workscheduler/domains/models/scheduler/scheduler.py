# -*- coding: utf-8 -*-

from eart import (
    Individual, Genetic
)


class Scheduler:
    def __init__(self, affiliation_id, calendar_id):
        self._affiliation_id = affiliation_id
        self._calendar_id = calendar_id

    def run(self):
        pass
