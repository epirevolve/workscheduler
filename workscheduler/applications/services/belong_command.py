# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import BelongFactory


class BelongCommand:
    def __init__(self, session):
        self._session = session
        
    def append_belong(self, name: str, note: str):
        belong = BelongFactory.create_new_belongs(name, note)
        self._session.add(belong)
        return belong
