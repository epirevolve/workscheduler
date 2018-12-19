# -*- coding: utf-8 -*-

from workscheduler.applications.services import BelongCommand


class BelongCommandAdapter(BelongCommand):
    def append_belong(self, form):
        name = form.get('belong-name')
        note = form.get('belong-note')
        if not name:
            raise ValueError()
        return super(BelongCommandAdapter, self).append_belong(name, note)
