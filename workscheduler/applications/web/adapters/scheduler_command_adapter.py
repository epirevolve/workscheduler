# -*- coding: utf-8 -*-

from workscheduler.applications.services import (
    SchedulerCommand
)
from .utils import validate_form
from ..forms import (
    SchedulerBasicOptionForm, WorkCategoryForm
)


class SchedulerCommandAdapter(SchedulerCommand):
    def append_work_category(self, form: WorkCategoryForm):
        if not validate_form(form):
            raise ValueError
        return super(SchedulerCommandAdapter, self).append_work_category(
            form.title.data, form.week_day_require.data, form.week_day_max.data,
            form.holiday_require.data, form.holiday_max.data,
            form.rest_days.data, form.max_times.data,
            form.essential_skills.data, form.essential_operators.data, form.impossible_operators.data
        )
    
    def update_work_category(self, form: WorkCategoryForm):
        if not validate_form(form):
            raise ValueError
        return super(SchedulerCommandAdapter, self).update_work_category(
            form.id.data, form.title.data, form.week_day_require.data, form.week_day_max.data,
            form.holiday_require.data, form.holiday_max.data,
            form.rest_days.data, form.max_times.data,
            form.essential_skills.data, form.essential_operators.data, form.impossible_operators.data
        )
    
    def append_option(self, form: SchedulerBasicOptionForm):
        if not validate_form(form):
            raise ValueError
        work_category_ids = [self.append_work_category(x).id for x in form.work_categories]
        self._session.flush()
        return super(SchedulerCommandAdapter, self).append_option(
            form.affiliation.data, form.certified_skill.data,
            form.not_certified_skill.data, work_category_ids
        )
    
    def update_option(self, form: SchedulerBasicOptionForm):
        if not validate_form(form):
            raise ValueError
        work_category_ids = [self.append_work_category(x).id if x.id.data.startswith('tmp')
                             else self.update_work_category(x).id
                             for x in form.work_categories]
        self._session.flush()
        return super(SchedulerCommandAdapter, self).update_option(
            form.id.data, form.affiliation.data, form.certified_skill.data,
            form.not_certified_skill.data, work_category_ids
        )
