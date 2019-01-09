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
from workscheduler.domains.models.operator import Skill
from workscheduler.domains.utils.uuid import UuidFactory
from .. import OrmBase


associated_skill_table\
    = Table("associated_essential_skill", OrmBase.metadata,
            Column("left_id", String, ForeignKey('work_categories.id')),
            Column("right_id", String, ForeignKey('skills.id')))


class WorkCategory(OrmBase):
    __tablename__ = 'work_categories'
    id = Column(String, primary_key=True)
    title = Column(String(200), nullable=False)
    default = Column(Integer)
    holiday = Column(Integer)
    rest_next_day = Column(Boolean)
    essential_skills = relationship("Skill", secondary=associated_skill_table)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, title: str,
                 default: int, holiday: int, rest_next_day: bool,
                 essential_skills: [Skill]):
        self.id = id
        self.title = title
        self.default = default
        self.holiday = holiday
        self.rest_next_day = rest_next_day
        self.essential_skills = essential_skills
    
    @staticmethod
    def new_category(title: str, default: int, holiday: int,
                     rest_next_day: bool, essential_skills: [Skill]):
        return WorkCategory(UuidFactory.new_uuid(), title, default, holiday,
                            rest_next_day, essential_skills)
