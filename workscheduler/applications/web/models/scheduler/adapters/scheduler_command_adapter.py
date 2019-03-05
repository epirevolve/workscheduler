# -*- coding: utf-8 -*-

from datetime import time

from workscheduler.applications.services import SchedulerCommand
from workscheduler.applications.web.util.functions.adapter import validate_form
from ..forms import BaseSettingForm
from ..forms import WorkCategoryForm


class SchedulerCommandAdapter:
    def __init__(self, session):
        self._session = session
    
    def update_monthly_setting(self, data: dict):
        id_ = data.get('id')
        days = data.get('days')
        holidays = data.get('holidays')
        fixed_schedules = data.get('fixed_schedules')
        return SchedulerCommand(self._session).update_monthly_setting(
            id_, days, holidays, fixed_schedules
        )
    
    def public_monthly_setting(self, monthly_setting_id: str):
        return SchedulerCommand(self._session).public_monthly_setting(monthly_setting_id)
    
    def append_work_category(self, form: WorkCategoryForm):
        if not validate_form(form):
            raise ValueError
        return SchedulerCommand(self._session).append_work_category(
            form.title.data, form.week_day_require.data, form.week_day_max.data,
            form.holiday_require.data, form.holiday_max.data,
            form.rest_days.data, form.max_times.data,
            form.essential_skills.data, form.essential_operators.data, form.impossible_operators.data
        )
    
    def update_work_category(self, form: WorkCategoryForm):
        if not validate_form(form):
            raise ValueError
        return SchedulerCommand(self._session).update_work_category(
            form.id.data, form.title.data, form.week_day_require.data, form.week_day_max.data,
            form.holiday_require.data, form.holiday_max.data,
            form.rest_days.data, form.max_times.data,
            form.essential_skills.data, form.essential_operators.data, form.impossible_operators.data
        )
    
    def update_option(self, form: BaseSettingForm):
        if not validate_form(form):
            raise ValueError
        work_category_ids = [self.append_work_category(x).id if x.id.data.startswith('tmp')
                             else self.update_work_category(x).id
                             for x in form.work_categories]
        self._session.flush()
        return SchedulerCommand(self._session).update_option(
            form.id.data, form.affiliation.data, form.certified_skill.data,
            form.not_certified_skill.data, work_category_ids
        )
