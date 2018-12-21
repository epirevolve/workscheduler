# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import Belong


class BelongCommand:
    def __init__(self, session):
        self._session = session
        
    def append_belong(self, name: str, note: str):
        belong = Belong.new_belong(name, note)
        self._session.add(belong)
        return belong
