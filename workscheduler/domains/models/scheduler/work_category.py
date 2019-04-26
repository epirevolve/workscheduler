# -*- coding: utf-8 -*-

from datetime import time

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import Integer
from sqlalchemy.types import DateTime
from sqlalchemy.types import Time

from mypackages.utils.uuid import UuidFactory

from .. import OrmBase
from ..operator import Skill
from ..operator import Operator

associated_week_day_operator_table\
    = Table("associated_week_day_operator", OrmBase.metadata,
            Column("left_id", String, ForeignKey('work_categories.id')),
            Column("right_id", String, ForeignKey('operators.id')))

associated_holiday_operator_table\
    = Table("associated_holiday_operator", OrmBase.metadata,
            Column("left_id", String, ForeignKey('work_categories.id')),
            Column("right_id", String, ForeignKey('operators.id')))

associated_skill_table\
    = Table("associated_essential_skill", OrmBase.metadata,
            Column("left_id", String, ForeignKey('work_categories.id')),
            Column("right_id", String, ForeignKey('skills.id')))

associated_exclusive_operator_table\
    = Table("associated_exclusive_operator", OrmBase.metadata,
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
    at_from = Column(Time)
    at_to = Column(Time)
    week_day_require = Column(Integer)
    week_day_max = Column(Integer)
    holiday_require = Column(Integer)
    holiday_max = Column(Integer)
    day_offs = Column(Integer)
    max_times = Column(Integer)
    week_day_operators = relationship("Operator", secondary=associated_week_day_operator_table, lazy='subquery')
    holiday_operators = relationship("Operator", secondary=associated_holiday_operator_table, lazy='subquery')
    essential_skills = relationship("Skill", secondary=associated_skill_table, lazy='subquery')
    exclusive_operators = relationship("Operator", secondary=associated_exclusive_operator_table, lazy='subquery')
    impossible_operators = relationship("Operator", secondary=associated_impossible_operator_table, lazy='subquery')
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id_: str, title: str, at_from: time, at_to: time,
                 week_day_require: int, week_day_max: int, holiday_require: int, holiday_max: int,
                 day_offs: int, max_times: int, week_day_operators: [Operator],
                 holiday_operators: [Operator], essential_skills: [Skill], exclusive_operators: [Operator],
                 impossible_operators: [Operator]):
        self.id = id_
        self.title = title
        self.at_from = at_from
        self.at_to = at_to
        self.week_day_require = week_day_require
        self.week_day_max = week_day_max
        self.holiday_require = holiday_require
        self.holiday_max = holiday_max
        self.day_offs = day_offs
        self.max_times = max_times
        self.week_day_operators = week_day_operators
        self.holiday_operators = holiday_operators
        self.essential_skills = essential_skills
        self.exclusive_operators = exclusive_operators
        self.impossible_operators = impossible_operators
    
    @staticmethod
    def new_category(title: str, at_from: time, at_to: time,
                     week_day_require: int, week_day_max: int, holiday_require: int, holiday_max: int,
                     day_offs: int, max_times: int, week_day_operators: [Operator],
                     holiday_operators: [Operator], essential_skills: [Skill], exclusive_operators: [Operator],
                     impossible_operators: [Operator]):
        return WorkCategory(UuidFactory.new_uuid(), title, at_from, at_to,
                            week_day_require, week_day_max, holiday_require, holiday_max,
                            day_offs, max_times, week_day_operators, holiday_operators,
                            essential_skills, exclusive_operators, impossible_operators)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, WorkCategory):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
