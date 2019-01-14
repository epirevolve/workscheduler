# -*- coding: utf-8 -*-

from workscheduler.applications.services import SchedulerCommand
from ..forms import (
    SchedulerOptionForm, WorkCategoryForm
)
from .utils import validate_form


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
    
    def append_option(self, form: SchedulerOptionForm):
        if not validate_form(form):
            raise ValueError
        work_category_ids = [self.append_work_category(x).id for x in form.work_categories]
        self._session.flush()
        return super(SchedulerCommandAdapter, self).append_option(
            form.belong.data, form.certified_skill.data,
            form.not_certified_skill.data, work_category_ids
        )
    
    def update_option(self, form: SchedulerOptionForm):
        if not validate_form(form):
            raise ValueError
        work_category_ids = [self.append_work_category(x).id if not x.id.data else self.update_work_category(x).id
                             for x in form.work_categories]
        self._session.flush()
        return super(SchedulerCommandAdapter, self).update_option(
            form.id.data, form.belong.data, form.certified_skill.data,
            form.not_certified_skill.data, work_category_ids
        )
