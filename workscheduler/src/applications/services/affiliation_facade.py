# -*- coding: utf-8 -*-

from . import AffiliationCommand
from . import SchedulerCommand


class AffiliationFacade:
    def __init__(self, session):
        self._session = session
    
    def append_affiliation(self, name: str, note: str):
        affiliation = AffiliationCommand(self._session).append_affiliation(name, note)
        self._session.flush()
        SchedulerCommand(self._session).append_scheduler(affiliation.id)
        return affiliation
