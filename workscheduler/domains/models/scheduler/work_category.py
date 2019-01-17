# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.orm import (
    relationship
)
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import (
    String, Integer,
    DateTime
)

from mypackages.utils.uuid import UuidFactory
from workscheduler.domains.models.operator import (
    Skill, Operator
)
from .. import OrmBase

associated_skill_table\
    = Table("associated_essential_skill", OrmBase.metadata,
            Column("left_id", String, ForeignKey('work_categories.id')),
            Column("right_id", String, ForeignKey('skills.id')))

associated_essential_operator_table\
    = Table("associated_essential_operator", OrmBase.metadata,
            Column("left_id", String, ForeignKey('work_categories.id')),
            Column("right_id", String, ForeignKey('operators.id')))

associated_impossible_operator_table\
    = Table("associated_impossible_operator", OrmBase.metadata,
            Column("left_id", String, ForeignKey('work_categories.id')),
            Column("right_id", String, ForeignKey('operators.id')))


class WorkCategory(OrmBase):
    __tablename__ = 'work_categories'
    id = Column(String, primary_key=True)
    title = Column(String(200), nullable=False)
    week_day_require = Column(Integer)
    week_day_max = Column(Integer)
    holiday_require = Column(Integer)
    holiday_max = Column(Integer)
    rest_days = Column(Integer)
    max_times = Column(Integer)
    essential_skills = relationship("Skill", secondary=associated_skill_table)
    essential_operators = relationship("Operator", secondary=associated_essential_operator_table)
    impossible_operators = relationship("Operator", secondary=associated_impossible_operator_table)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id_: str, title: str, week_day_require: int, week_day_max: int,
                 holiday_require: int, holiday_max: int, rest_days: int, max_times: int,
                 essential_skills: [Skill], essential_operators: [Operator], impossible_operators: [Operator]):
        self.id = id_
        self.title = title
        self.week_day_require = week_day_require
        self.week_day_max = week_day_max
        self.holiday_require = holiday_require
        self.holiday_max = holiday_max
        self.rest_days = rest_days
        self.max_times = max_times
        self.essential_skills = essential_skills
        self.essential_operators = essential_operators
        self.impossible_operators = impossible_operators
    
    @staticmethod
    def new_category(title: str, week_day_require: int, week_day_max: int,
                     holiday_require: int, holiday_max: int, rest_days: int, max_times: int,
                     essential_skills: [Skill], essential_operators: [Operator], impossible_operators: [Operator]):
        return WorkCategory(UuidFactory.new_uuid(), title, week_day_require, week_day_max,
                            holiday_require, holiday_max, rest_days, max_times,
                            essential_skills, essential_operators, impossible_operators)
