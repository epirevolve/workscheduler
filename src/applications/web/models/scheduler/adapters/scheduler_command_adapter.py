# -*- coding: utf-8 -*-

from collections import namedtuple

from applications.services import SchedulerCommand
from applications.web.util.functions.converter import to_date

from applications.services.json_orm import to_monthly_setting
from applications.services.json_orm import to_scheduler


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
    
    def update_yearly_setting(self, scheduler_id: str, data: dict):
        Vacation = namedtuple('Vacation', ('id', 'title', 'on_from', 'on_to', 'days'))
        vacations = [Vacation(
            x.get('id'), x.get('title'), to_date(x.get('on_from')),
            to_date(x.get('on_to')), x.get('days')) for x in data.get('vacations')]
        return SchedulerCommand(self._session).update_yearly_setting(
            scheduler_id, data.get('year'), vacations)
    
    def launch(self, data: dict):
        return SchedulerCommand(self._session).launch(
            data.get('team_id'), data.get('month'), data.get('year'))
