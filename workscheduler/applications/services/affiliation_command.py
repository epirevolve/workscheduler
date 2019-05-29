# -*- coding: utf-8 -*-

from domains.models.user import Affiliation

from .affiliation_query import AffiliationQuery


class AffiliationCommand:
    def __init__(self, session):
        self._session = session
        
    def append_affiliation(self, name: str, note: str):
        affiliation = Affiliation.new(name, note)
        self._session.add(affiliation)
        return affiliation
    
    def update_affiliation(self, id_: str, name: str, note: str):
        affiliation = AffiliationQuery(self._session).get_affiliation(id_)
        affiliation.name = name
        affiliation.note = note
        return affiliation
    
    def remove_affiliation(self, id_: str):
        affiliation = AffiliationQuery(self._session).get_affiliation(id_)
        self._session.delete(affiliation)
