# -*- coding: utf-8 -*-

from applications.services import OperatorCommand


class OperatorCommandAdapter:
    def __init__(self, session):
        self._session = session
    
    def update_myself(self, data):
        return OperatorCommand(self._session).update_myself(
            data.get('id'), [x.get('id') for x in data.get('skills')], data.get('remain_paid_holidays')
        )
    
    def update_operator(self, data):
        ojt = data.get('ojt')
        return OperatorCommand(self._session).update_operator(
            data.get('id'), [x.get('id') for x in data.get('skills')], ojt.get('id') if ojt else None
        )
