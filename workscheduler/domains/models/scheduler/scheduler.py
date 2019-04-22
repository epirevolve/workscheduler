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

from mypackages.utils.uuid import UuidFactory
from .. import OrmBase
from ..user import Affiliation
from . import WorkCategory
from . import MonthlySetting
from . import YearlySetting

from .scheduler_outline_helper import SchedulerOutlineHelper
from .scheduler_detail_helper import SchedulerDetailHelper
from .scheduler_outline_detail_match_helper import SchedulerOutlineDetailMatchHelper
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
    _affiliation_id = Column(String, ForeignKey('affiliations.id'))
    affiliation = relationship("Affiliation", uselist=False, lazy='joined')
    monthly_settings = relationship("MonthlySetting", secondary=associated_monthly_setting_table, lazy='joined')
    yearly_settings = relationship("YearlySetting", secondary=associated_yearly_setting_table, lazy='joined')
    certified_skill = Column(Boolean)
    not_certified_skill = Column(Boolean)
    is_launching = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table, lazy='joined')
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id_: str, affiliation: Affiliation,
                 certified_skill: bool, not_certified_skill: bool,
                 work_categories: [WorkCategory]):
        self.id = id_
        self.affiliation = affiliation
        self.monthly_settings = []
        self.yearly_settings = []
        self.certified_skill = certified_skill
        self.not_certified_skill = not_certified_skill
        self.work_categories = work_categories
        self.is_launching = False

    @validates("id, affiliation")
    def validate(self, key, value):
        return super(Scheduler, self).validate(Scheduler, key, value)

    @staticmethod
    def new_scheduler(affiliation: Affiliation):
        return Scheduler(UuidFactory.new_uuid(), affiliation,
                         True, True, [])
    
    def monthly_setting(self, month: int, year: int):
        monthly_setting = list(filter(lambda x: x.year == year and x.month == month,
                                      self.monthly_settings))
        if not monthly_setting:
            monthly_setting = MonthlySetting.new_monthly_setting(
                self.work_categories, year, month)
            self.monthly_settings.append(monthly_setting)
        else:
            monthly_setting = monthly_setting[0]
        return monthly_setting
    
    def yearly_setting(self, year: int):
        yearly_setting = list(filter(lambda x: x.year == year, self.yearly_settings))
        if not yearly_setting:
            yearly_setting = YearlySetting.new_yearly_setting(year)
            self.yearly_settings.append(yearly_setting)
        else:
            yearly_setting = yearly_setting[0]
        return yearly_setting
    
    def run(self, month: int, year: int, operators):
        monthly_setting = self.monthly_setting(month, year)
        outlines = SchedulerOutlineHelper(monthly_setting, operators).run()
        details = SchedulerDetailHelper(monthly_setting, operators).run()
        combinations = SchedulerOutlineDetailMatchHelper(outlines, details).run()
        ret = SchedulerMonthlyHelper(monthly_setting, {x: y for x, y in zip(operators, combinations)}).run()
        # return np.reshape(ret.gene, (len(operators), -1))
