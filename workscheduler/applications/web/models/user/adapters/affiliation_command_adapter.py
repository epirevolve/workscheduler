# -*- coding: utf-8 -*-

from workscheduler.applications.services import AffiliationCommand


class AffiliationCommandAdapter:
    def __init__(self, session):
        self._session = session
        
    def update_affiliation(self, data: dict):
        return AffiliationCommand(self._session).update_affiliation(
            data.get('id'), data.get('name'), data.get('note')
        )
    
    def remove_affiliation(self, id_):
        AffiliationCommand(self._session).remove_affiliation(id_)
