# -*- coding: utf-8 -*-

from datetime import datetime

from flask_login import current_user

from backend.services import SchedulerCommand
from backend.services.domain_orm import to_monthly_setting
from backend.services.domain_orm import to_scheduler
from backend.services.domain_orm import to_vacation
from backend.services.domain_orm import to_new_vacation
from backend.services.domain_orm import to_request


class SchedulerCommandAdapter:
    def __init__(self, session):
        self._session = session

    def update_monthly_setting(self, data: dict):
        monthly_setting = to_monthly_setting(data)
        return SchedulerCommand(self._session).update_monthly_setting(monthly_setting)
    
    def public_monthly_setting(self, data: dict):
        monthly_setting = self.update_monthly_setting(data)
        self._session.flush()
        return SchedulerCommand(self._session).public_monthly_setting(monthly_setting.id)
    
    def update_basic_setting(self, data: dict):
        scheduler = to_scheduler(data)
        return SchedulerCommand(self._session).update_basic_setting(scheduler)

    def append_vacation(self, data: dict):
        vacation = to_new_vacation(data.get('vacation'))
        return SchedulerCommand(self._session).append_vacation(data.get('team-id'), vacation)

    def update_vacation(self, data: dict):
        vacation = to_vacation(data.get('vacation'))
        return SchedulerCommand(self._session).update_vacation(vacation)
    
    def launch(self, data: dict):
        return SchedulerCommand(self._session).launch(
            data.get('team_id'), data.get('month'), data.get('year'))

    def terminate(self, data: dict):
        return SchedulerCommand(self._session).terminate(
            data.get('team_id'), data.get('month'), data.get('year'))

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

    def update_my_request(self, scheduler_id: str, data: dict):
        request = to_request(data.get('request'))
        id_ = data.get('id')
        title = data.get('title')
        note = data.get('note') or ''
        at_from_str = data.get('at_from')
        at_to_str = data.get('at_to')
        if not id_ or not title or not at_from_str or not at_to_str:
            raise ValueError()
        at_from = datetime.strptime(at_from_str, '%Y-%m-%d %H:%M')
        at_to = datetime.strptime(at_to_str, '%Y-%m-%d %H:%M')
        return SchedulerCommand(self._session).update_my_request(
            scheduler_id, id_, title,
            note, at_from, at_to
        )

    def remove_my_request(self, id: str):
        return SchedulerCommand(self._session).remove_my_request(id)
