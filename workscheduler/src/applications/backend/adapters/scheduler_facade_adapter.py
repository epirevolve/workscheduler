# -*- coding: utf-8 -*-

from applications.backend.services import SchedulerFacade


class SchedulerFacadeAdapter:
    def __init__(self, session):
        self._session = session

    def launch(self, data: dict):
        return SchedulerFacade(self._session).launch(
            data.get('team_id'), data.get('month'), data.get('year'))
