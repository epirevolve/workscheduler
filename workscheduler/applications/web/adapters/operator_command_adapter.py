# -*- coding: utf-8 -*-

from workscheduler.applications.services import OperatorCommand
from ..forms import OperatorForm
from .utils import validate_form


class OperatorCommandAdapter(OperatorCommand):
    def store_myself(self, form: OperatorForm):
        if not validate_form(form):
            return
        super(OperatorCommandAdapter, self).store_myself(
            form.id.data, [x.id.data for x in form.all_skills if x.is_obtain.data]
        )
