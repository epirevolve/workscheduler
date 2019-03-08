# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import Affiliation


class AffiliationQuery:
    def __init__(self, session):
        self._session = session
    
    def get_affiliation(self, id_: str):
        return self._session.query(Affiliation).get(id_)

    def get_affiliations(self):
        return self._session.query(Affiliation).order_by(Affiliation.id).all()
    
    def get_default_affiliation(self):
        return next(filter(lambda x: x.is_default, self.get_affiliations()))
    
    def get_affiliations_without_default(self):
        default_affiliation = self.get_default_affiliation()
        affiliations = [b for b in self.get_affiliations() if not b.id == default_affiliation.id]
        return affiliations
