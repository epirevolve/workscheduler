# -*- coding: utf-8 -*-

from workscheduler.applications.services import AffiliationFacade


class AffiliationFacadeAdapter:
    def __init__(self, session):
        self._session = session
    
    def append_affiliation(self, form):
        name = form.get('affiliation-name')
        note = form.get('affiliation-note')
        if not name:
            raise ValueError()
        return AffiliationFacade(self._session).append_affiliation(name, note)
