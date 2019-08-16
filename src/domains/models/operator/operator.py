# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.types import String
from sqlalchemy.types import Integer

from utils.uuid import UuidFactory
from .. import OrmBase
from ..user import User
from .skill import Skill
from .relation import Relation

associated_skill_table\
    = Table("associated_skill", OrmBase.metadata,
            Column('left_id', String(54), ForeignKey('operators.id')),
            Column('right_id', String(54), ForeignKey('skills.id')))


associated_relation_table\
    = Table("associated_relation", OrmBase.metadata,
            Column('left_id', String(54), ForeignKey('operators.id')),
            Column('right_id', String(54), ForeignKey('relations.id')))


class Operator(OrmBase):
    __tablename__ = 'operators'
    id = Column(String(54), primary_key=True)
    _user_id = Column(String(54), ForeignKey('users.id'))
    user = relationship("User", uselist=False, lazy='subquery')
    skills = relationship("Skill", secondary=associated_skill_table, lazy='subquery')
    relations = relationship("Relation", secondary=associated_relation_table, lazy='subquery')
    _ojt_id = Column(String(54), ForeignKey('operators.id'))
    ojt = relationship("Operator", uselist=False, lazy='subquery')
    remain_paid_holidays = Column(Integer, default=0)

    def __init__(self, id: str, user: User,
                 skills: [Skill] = None, relations: [Relation] = None,
                 ojt: object = None, remain_paid_holidays: int = 0, **kwargs):
        self.id = id
        self.user = user
        self.skills = skills or []
        self.relations = relations or []
        self.ojt = ojt
        self.remain_paid_holidays = remain_paid_holidays

    @validates('id')
    def validate(self, key, value):
        return super(Operator, self).validate(Operator, key, value)

    @property
    def certified_skills(self):
        return list(filter(lambda x: x.is_certified, self.skills))
    
    @property
    def not_certified_skills(self):
        return list(filter(lambda x: not x.is_certified, self.skills))
    
    @staticmethod
    def new(user: User):
        operator = Operator(UuidFactory.new_uuid(), user)
        return operator
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Operator):
            return False
        return self.id == other.id
    
    def __hash__(self):
        return hash(self.id)
