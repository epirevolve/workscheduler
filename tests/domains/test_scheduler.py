# -*- coding: utf-8 -*-

import pytest
from datetime import datetime

from workscheduler.applications.services import AffiliationQuery
from workscheduler.applications.services import SchedulerQuery
from workscheduler.applications.services import OperatorQuery


class TestScheduler:
    def test_scheduling(self, session):
        affiliations = AffiliationQuery(session).get_affiliations()
        scheduler = SchedulerQuery(session).get_scheduler_of_affiliation_id(affiliations[1].id)
        operators = OperatorQuery(session).get_active_operators_of_affiliation_id(affiliations[1].id)
        
        scheduler.run(datetime.now().month + 1, datetime.now().year, operators)
