# -*- coding: utf-8 -*-

from workscheduler.applications.services import OperatorCommand


class OperatorCommandAdapter(OperatorCommand):
    def update_myself(self, data):
        return super(OperatorCommandAdapter, self).update_myself(
            data.get('id'), [x.get('id') for x in data.get('skills')], data.get('remain_paid_holidays')
        )
