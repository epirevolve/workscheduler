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
from .history import ProcessStatus

from .terminate_scheduler_error import TerminateSchedulerError

from .ga_helper import SchedulerOutlineHelper
from .ga_helper import SchedulerDetailHelper
from .ga_helper import SchedulerMonthlyHelper

associated_monthly_setting_table\
    = Table("associated_monthly_setting", OrmBase.metadata,
            Column("left_id", String(54), ForeignKey('schedulers.id')),
            Column("right_id", String(54), ForeignKey('monthly_settings.id')))


associated_vacation_table\
    = Table("associated_vacation", OrmBase.metadata,
            Column("left_id", String(54), ForeignKey('schedulers.id')),
            Column("right_id", String(54), ForeignKey('vacations.id')))


associated_work_category_table\
    = Table("associated_work_category", OrmBase.metadata,
            Column("left_id", String(54), ForeignKey('schedulers.id')),
            Column("right_id", String(54), ForeignKey('work_categories.id')))


class Scheduler(OrmBase):
    __tablename__ = "schedulers"
    id = Column(String(54), primary_key=True)
    _team_id = Column(String(54), ForeignKey('teams.id'))
    team = relationship("Team", uselist=False, lazy='subquery')
    monthly_settings = relationship("MonthlySetting", secondary=associated_monthly_setting_table, lazy='subquery')
    vacations = relationship("Vacation", secondary=associated_vacation_table, lazy='subquery')
    certified_skill = Column(Boolean)
    not_certified_skill = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table, lazy='subquery')
    is_launching = Column(Boolean)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, team: Team,
                 monthly_settings: [] = None, vacations: [] = None,
                 certified_skill: bool = True, not_certified_skill: bool = True,
                 work_categories: [] = None, is_launching: bool = False, **kwargs):
        self.id = id
        self.team = team
        self.monthly_settings = monthly_settings or []
        self.vacations = vacations or []
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
    
    def monthly_setting(self, *, month: int, year: int):
        monthly_setting = list(filter(lambda x: x.year == year and x.month == month, self.monthly_settings))
        if not monthly_setting:
            monthly_setting = MonthlySetting.new(self.work_categories, month, year)
            self.monthly_settings.append(monthly_setting)
        else:
            monthly_setting = monthly_setting[0]
        return monthly_setting

    @staticmethod
    def post_to_pipe(pipe):
        def post(status):
            continue_ = yield from pipe.send(status)
            if not continue_:
                raise TerminateSchedulerError('scheduler is canceled')
        return post

    def run(self, last_month_schedules, month: int, year: int, operators: [], pipe):
        try:
            monthly_setting = self.monthly_setting(month=month, year=year)
            post = self.post_to_pipe(pipe)
            post(ProcessStatus.OUTLINE)
            outlines = SchedulerOutlineHelper(
                self.work_categories, monthly_setting, operators, last_month_schedules).run()
            post(ProcessStatus.DETAIL)
            combinations = SchedulerDetailHelper(monthly_setting, operators, outlines).run()
            post(ProcessStatus.MONTHLY)
            schedule, adaptability = SchedulerMonthlyHelper(monthly_setting, operators, combinations).run()
            post(ProcessStatus.COMPLETE)
            return [(x, y) for x, y in zip(operators, schedule)], adaptability
        except TerminateSchedulerError as e:
            print(e)
            pipe.send(ProcessStatus.ABORT)
            raise e
        except Exception as e:
            print("### error on scheduler process.")
            print(e)
            pipe.send(ProcessStatus.ABORT)
            raise e
