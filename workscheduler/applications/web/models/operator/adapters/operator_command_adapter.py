# -*- coding: utf-8 -*-

from workscheduler.applications.services import OperatorCommand
from workscheduler.applications.web.util.functions.adapter import validate_form
from ..forms import OperatorForm


class OperatorCommandAdapter(OperatorCommand):
    def update_myself(self, form: OperatorForm):
        if not validate_form(form):
            raise ValueError()
        super(OperatorCommandAdapter, self).update_myself(
            form.id.data, [x.id.data for x in form.all_certified_skills if x.is_obtain.data],
            form.remain_paid_holiday.data
        )
