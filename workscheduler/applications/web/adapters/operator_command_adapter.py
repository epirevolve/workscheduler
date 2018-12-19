# -*- coding: utf-8 -*-

from datetime import datetime
from flask_login import current_user
from workscheduler.applications.services import OperatorCommand
from ..forms import OperatorForm
from .utils import validate_form


class OperatorCommandAdapter(OperatorCommand):
    def append_my_request(self, form):
        event_title = form.get('event-title')
        event_note = form.get('event_note') or ''
        event_at_from = form.get('event-at-from')
        event_at_to = form.get('event-at-to')
        if not event_title or not event_at_from or not event_at_to:
            raise ValueError()
        at_from = datetime.strptime(event_at_from, '%Y-%m-%d %H:%M')
        at_to = datetime.strptime(event_at_to, '%Y-%m-%d %H:%M')
        return super(OperatorCommandAdapter, self).append_my_request(
            current_user.id, event_title, event_note, at_from, at_to
        )
    
    def update_my_request(self, form):
        pass
    
    def update_myself(self, form: OperatorForm):
        if not validate_form(form):
            raise ValueError()
        super(OperatorCommandAdapter, self).update_myself(
            form.id.data, [x.id.data for x in form.all_skills if x.is_obtain.data]
        )
