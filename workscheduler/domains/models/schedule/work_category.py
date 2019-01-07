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
from .. import OrmBase


associated_skill_table\
    = Table("associated_skill", OrmBase.metadata,
            Column("left_id", String, ForeignKey('work_categories.id')),
            Column("right_id", String, ForeignKey('skills.id')))


class WorkCategory(OrmBase):
    __tablenames__ = 'work_categories'
    id = Column(String, primary_key=True)
    default_count = Column(Integer)
    is_rest_next_day = Column(Boolean)
    essential_skills = relationship("Skill", secondary=associated_skill_table)
    create_at = Column(DateTime, server_default=current_timestamp())
