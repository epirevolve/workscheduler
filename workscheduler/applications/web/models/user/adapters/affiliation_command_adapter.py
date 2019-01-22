# -*- coding: utf-8 -*-

from workscheduler.applications.services import AffiliationCommand


class AffiliationCommandAdapter(AffiliationCommand):
    def append_affiliation(self, form):
        name = form.get('affiliation-name')
        note = form.get('affiliation-note')
        if not name:
            raise ValueError()
        return super(AffiliationCommandAdapter, self).append_affiliation(name, note)
