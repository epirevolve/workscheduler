# -*- coding: utf-8 -*-

from datetime import datetime
from collections import namedtuple

from flask_login import current_user

from backend.functions.converter import to_date
from backend.services import SchedulerCommand
from backend.services.domain_orm import to_monthly_setting
from backend.services.domain_orm import to_scheduler


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

    def remove_my_request(self, id_: str):
        return SchedulerCommand(self._session).remove_my_request(id_)
