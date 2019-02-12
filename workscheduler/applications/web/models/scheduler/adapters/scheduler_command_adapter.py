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
    
    def append_my_request(self, scheduler_id: str, month_year_setting_id: str, form):
        event_title = form.get('requestTitle')
        event_note = form.get('requestNote') or ''
        event_at_from = form.get('requestAtFrom')
        event_at_to = form.get('requestAtTo')
        if not event_title or not event_at_from or not event_at_to:
            raise ValueError()
        at_from = datetime.strptime(event_at_from, '%Y-%m-%d %H:%M')
        at_to = datetime.strptime(event_at_to, '%Y-%m-%d %H:%M')
        
        return SchedulerCommand(self._session).append_my_request(
            current_user.id, scheduler_id, month_year_setting_id,
            event_title, event_note, at_from, at_to
        )
    
    def update_my_request(self, form):
        pass
    
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
