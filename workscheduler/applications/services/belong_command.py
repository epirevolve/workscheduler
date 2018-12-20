# -*- coding: utf-8 -*-

from workscheduler.domains.models.operator import Belong


class BelongCommand:
    def __init__(self, session):
        self._session = session
        
    def append_belong(self, name: str, note: str):
        belong = Belong.create_new_belongs(name, note)
        self._session.add(belong)
        return belong
