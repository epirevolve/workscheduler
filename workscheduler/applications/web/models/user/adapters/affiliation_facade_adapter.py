# -*- coding: utf-8 -*-

from workscheduler.applications.services import AffiliationFacade


class AffiliationFacadeAdapter(AffiliationFacade):
    def append_affiliation(self, form):
        name = form.get('affiliation-name')
        note = form.get('affiliation-note')
        if not name:
            raise ValueError()
        return super(AffiliationFacadeAdapter, self).append_affiliation(name, note)
