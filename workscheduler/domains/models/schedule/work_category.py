# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.types import (
    String, Boolean, Integer,
    DateTime
)
from sqlalchemy.orm import (
    relationship, validates
)
from sqlalchemy.sql.functions import current_timestamp
from workscheduler.domains.models.operator import (
    Skill, Operator
)
from workscheduler.domains.utils.uuid import UuidFactory
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
    default = Column(Integer)
    holiday = Column(Integer)
    rest_days = Column(Integer)
    essential_skills = relationship("Skill", secondary=associated_skill_table)
    essential_operators = relationship("Operator", secondary=associated_essential_operator_table)
    impossible_operators = relationship("Operator", secondary=associated_impossible_operator_table)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, title: str, default: int,
                 holiday: int, rest_days: int, essential_skills: [Skill],
                 essential_operators: [Operator], impossible_operators: [Operator]):
        self.id = id
        self.title = title
        self.default = default
        self.holiday = holiday
        self.rest_days = rest_days
        self.essential_skills = essential_skills
        self.essential_operators = essential_operators
        self.impossible_operators = impossible_operators
    
    @staticmethod
    def new_category(title: str, default: int, holiday: int,
                     rest_days: int, essential_skills: [Skill],
                     essential_operators: [Operator], impossible_operators: [Operator]):
        return WorkCategory(UuidFactory.new_uuid(), title, default,
                            holiday, rest_days, essential_skills,
                            essential_operators, impossible_operators)
