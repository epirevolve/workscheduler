# -*- coding: utf-8 -*-

from applications.backend.services import SchedulerCommand
from applications.backend.services.domain_orm import to_monthly_setting
from applications.backend.services.domain_orm import to_scheduler
from applications.backend.services.domain_orm import to_vacation


class SchedulerCommandAdapter:
    def __init__(self, session):
        self._session = session

    def save_scheduler(self, data: dict):
        scheduler = to_scheduler(data)
        return SchedulerCommand(self._session).save_scheduler(scheduler)

    def save_monthly_setting(self, data: dict):
        monthly_setting = to_monthly_setting(data)
        return SchedulerCommand(self._session).save_monthly_setting(monthly_setting)
    
    def public_monthly_setting(self, data: dict):
        monthly_setting = to_monthly_setting(data)
        return SchedulerCommand(self._session).public_monthly_setting(monthly_setting)

    def remove_request(self, id: str):
        SchedulerCommand(self._session).remove_request(id)

    def save_basic_setting(self, data: dict):
        scheduler = to_scheduler(data)
        return SchedulerCommand(self._session).save_basic_setting(scheduler)

    def append_vacation(self, data: dict):
        vacation = to_vacation(data.get('vacation'))
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
