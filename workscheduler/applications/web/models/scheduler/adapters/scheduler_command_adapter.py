# -*- coding: utf-8 -*-

from datetime import datetime

from flask_login import current_user

from workscheduler.applications.services import SchedulerCommand
from workscheduler.applications.web.util.functions.adapter import validate_form
from ..forms import BaseSettingForm
from ..forms import WorkCategoryForm


class SchedulerCommandAdapter:
    def __init__(self, session):
        self._session = session
    
    def append_my_request(self, scheduler_id: str, data: dict):
        title = data.get('title')
        note = data.get('note') or ''
        at_from_str = data.get('at_from')
        at_to_str = data.get('at_to')
        if not title or not at_from_str or not at_to_str:
            raise ValueError()
        at_from = datetime.strptime(at_from_str, '%Y-%m-%d %H:%M')
        at_to = datetime.strptime(at_to_str, '%Y-%m-%d %H:%M')
        
        return SchedulerCommand(self._session).append_my_request(
            current_user.id, scheduler_id, title,
            note, at_from, at_to
        )
    
    def update_my_request(self, form):
        pass
    
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
