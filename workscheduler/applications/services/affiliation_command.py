# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import Affiliation


class AffiliationCommand:
    def __init__(self, session):
        self._session = session
        
    def append_affiliation(self, name: str, note: str):
        affiliation = Affiliation.new_affiliation(name, note)
        self._session.add(affiliation)
        return affiliation
