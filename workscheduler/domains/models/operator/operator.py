# -*- coding: utf-8 -*-

from workscheduler.domains.models import OrmBase
from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.types import String

associated_skill_table\
    = Table("associated_skill", OrmBase.metadata,
            Column('left_id', String, ForeignKey('users.id')),
            Column('right_id', String, ForeignKey('skills.id'))
            )


associated_relation_table\
    = Table("associated_relation", OrmBase.metadata,
            Column('left_id', String, ForeignKey('users.id')),
            Column('right_id', String, ForeignKey('relations.id'))
            )


class Operator(OrmBase):
    __tablename__ = 'operators'
    id = Column(String, primary_key=True)
    skills = relationship("Skill", secondary=associated_skill_table)
    relations = relationship("Relation", secondary=associated_relation_table)

    def __init__(self):
        self.skills = []
        self.relations = []
