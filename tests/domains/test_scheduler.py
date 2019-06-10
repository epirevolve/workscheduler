# -*- coding: utf-8 -*-

import pytest
from datetime import datetime

from applications.services import TeamQuery
from applications.services import SchedulerQuery
from applications.services import OperatorQuery
from domains.models.scheduler.scheduler_detail_helper import SchedulerDetailHelper
from domains.models.scheduler.scheduler_outline_helper import work_day_sign
from domains.models.scheduler.scheduler_outline_helper import holiday_sign


class TestScheduler:
    def test_scheduling(self, session):
        teams = TeamQuery(session).get_teams()
        scheduler = SchedulerQuery(session).get_scheduler_of_team_id(teams[1].id)
        operators = OperatorQuery(session).get_active_operators_of_team_id(teams[1].id)
        
        scheduler.run(datetime.now().month + 1, datetime.now().year, operators)
        
    def test_scheduler_monthly_set_work_categories_day_off(self, session):
        teams = TeamQuery(session).get_teams()
        scheduler = SchedulerQuery(session).get_scheduler_of_team_id(teams[1].id)
        operators = OperatorQuery(session).get_active_operators_of_team_id(teams[1].id)
        
        monthly_setting = scheduler.monthly_setting(datetime.now().month + 1, datetime.now().year)
        detail_helper = SchedulerDetailHelper(monthly_setting, operators, [])
        test_a = [work_day_sign] * 2 + [holiday_sign] + [work_day_sign] * 2\
            + [holiday_sign] + [work_day_sign] * 3 + [holiday_sign] + [work_day_sign] * 3\
            + [holiday_sign] + [work_day_sign] * 2 + [holiday_sign] + [work_day_sign] * 3\
            + [holiday_sign] * 2 + [work_day_sign] * 3 + [holiday_sign] + [work_day_sign] * 2\
            + [holiday_sign] + [work_day_sign] * 2
        detail_helper._set_work_category_day_off(test_a, scheduler.work_categories[-1])
        test_a = []
