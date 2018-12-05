# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.orm import (
    relationship, validates
)
from sqlalchemy.types import String
from workscheduler.domains.models import OrmBase

associated_skill_table\
    = Table("associated_skill", OrmBase.metadata,
            Column('left_id', String, ForeignKey('operators.id')),
            Column('right_id', String, ForeignKey('skills.id'))
            )


associated_relation_table\
    = Table("associated_relation", OrmBase.metadata,
            Column('left_id', String, ForeignKey('operators.id')),
            Column('right_id', String, ForeignKey('relations.id'))
            )


class Operator(OrmBase):
    __tablename__ = 'operators'
    id = Column(String, primary_key=True)
    skills = relationship("Skill", secondary=associated_skill_table)
    relations = relationship("Relation", secondary=associated_relation_table)

    @validates('id')
    def validate(self, key, value):
        return super(Operator, self).validate(Operator, key, value)
    
    def __init__(self, id: str):
        self.id = id
        self.skills = []
        self.relations = []
    
    def change_skills(self, skills: []):
        self.skills.clear()
        for skill in skills:
            self.skills.append(skill)
