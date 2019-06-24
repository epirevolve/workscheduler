# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import Boolean
from sqlalchemy.types import DateTime

from utils.uuid import UuidFactory

from .. import OrmBase
from ..user import Team
from . import MonthlySetting
from . import YearlySetting

from .scheduler_outline_helper import SchedulerOutlineHelper
from .scheduler_detail_helper import SchedulerDetailHelper
from .scheduler_monthly_helper import SchedulerMonthlyHelper

associated_monthly_setting_table\
    = Table("associated_monthly_setting", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('monthly_settings.id')))


associated_yearly_setting_table\
    = Table("associated_yearly_setting", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('yearly_settings.id')))


associated_work_category_table\
    = Table("associated_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class Scheduler(OrmBase):
    __tablename__ = "schedulers"
    id = Column(String, primary_key=True)
    _team_id = Column(String, ForeignKey('teams.id'))
    team = relationship("Team", uselist=False, lazy='subquery')
    monthly_settings = relationship("MonthlySetting", secondary=associated_monthly_setting_table, lazy='subquery')
    yearly_settings = relationship("YearlySetting", secondary=associated_yearly_setting_table, lazy='subquery')
    certified_skill = Column(Boolean)
    not_certified_skill = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table, lazy='subquery')
    is_launching = Column(Boolean)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, team: Team,
                 monthly_settings: [] = None, yearly_settings: [] = None,
                 certified_skill: bool = True, not_certified_skill: bool = True,
                 work_categories: [] = None, is_launching: bool = False, **kwargs):
        self.id = id
        self.team = team
        self.monthly_settings = monthly_settings or []
        self.yearly_settings = yearly_settings or []
        self.certified_skill = certified_skill
        self.not_certified_skill = not_certified_skill
        self.work_categories = work_categories or []
        self.is_launching = is_launching

    @validates("id, team")
    def validate(self, key, value):
        return super(Scheduler, self).validate(Scheduler, key, value)

    @staticmethod
    def new(team: Team):
        return Scheduler(UuidFactory.new_uuid(), team)
    
    def monthly_setting(self, month: int, year: int):
        monthly_setting = list(filter(lambda x: x.year == year and x.month == month, self.monthly_settings))
        if not monthly_setting:
            monthly_setting = MonthlySetting.new(self.work_categories, month, year)
            self.monthly_settings.append(monthly_setting)
        else:
            monthly_setting = monthly_setting[0]
        return monthly_setting
    
    def yearly_setting(self, year: int):
        yearly_setting = list(filter(lambda x: x.year == year, self.yearly_settings))
        if not yearly_setting:
            yearly_setting = YearlySetting.new(year)
            self.yearly_settings.append(yearly_setting)
        else:
            yearly_setting = yearly_setting[0]
        return yearly_setting
    
    def run(self, month: int, year: int, operators):
        try:
            monthly_setting = self.monthly_setting(month, year)
            outlines = SchedulerOutlineHelper(self.work_categories, monthly_setting, operators).run()
            combinations = SchedulerDetailHelper(monthly_setting, operators, outlines).run()
            schedule, adaptability = SchedulerMonthlyHelper(monthly_setting, operators, combinations).run()
            return [(x, y) for x, y in zip(operators, schedule)], adaptability
        except Exception as e:
            print("### error on scheduler process.")
            print(e)
