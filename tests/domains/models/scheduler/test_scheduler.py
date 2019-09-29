# -*- coding: utf-8 -*-

from datetime import datetime

from backend.applications.services import TeamQuery
from backend.applications.services import SchedulerQuery
from backend.applications.services import OperatorQuery
from backend.domains import SchedulerDetailHelper
from backend.domains import work_day_sign
from backend.domains import holiday_sign


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
        
        monthly_setting = scheduler.monthly_setting(month=datetime.now().month + 1, year=datetime.now().year)
        detail_helper = SchedulerDetailHelper(monthly_setting, operators, [])
        test_a = [work_day_sign] * 2 + [holiday_sign] + [work_day_sign] * 2\
            + [holiday_sign] + [work_day_sign] * 3 + [holiday_sign] + [work_day_sign] * 3\
            + [holiday_sign] + [work_day_sign] * 2 + [holiday_sign] + [work_day_sign] * 3\
            + [holiday_sign] * 2 + [work_day_sign] * 3 + [holiday_sign] + [work_day_sign] * 2\
            + [holiday_sign] + [work_day_sign] * 2
        detail_helper._set_work_category_day_off(test_a, scheduler.work_categories[-1])
        test_a = []
