# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.types import String
from sqlalchemy.types import Integer

from mypackages.utils.uuid import UuidFactory
from .. import OrmBase
from ..user import User

associated_skill_table\
    = Table("associated_skill", OrmBase.metadata,
            Column('left_id', String, ForeignKey('operators.id')),
            Column('right_id', String, ForeignKey('skills.id')))


associated_relation_table\
    = Table("associated_relation", OrmBase.metadata,
            Column('left_id', String, ForeignKey('operators.id')),
            Column('right_id', String, ForeignKey('relations.id')))


class Operator(OrmBase):
    __tablename__ = 'operators'
    id = Column(String, primary_key=True)
    _user_id = Column(String, ForeignKey('users.id'))
    user = relationship("User", uselist=False, lazy='joined')
    skills = relationship("Skill", secondary=associated_skill_table, lazy='joined')
    relations = relationship("Relation", secondary=associated_relation_table, lazy='joined')
    _ojt_id = Column(String, ForeignKey('operators.id'))
    ojt = relationship("Operator", uselist=False, lazy='joined')
    remain_paid_holidays = Column(Integer, default=0)

    def __init__(self, id_: str, user: User):
        self.id = id_
        self.user = user
        self.skills = []
        self.relations = []

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
    def new_operator(user: User):
        operator = Operator(UuidFactory.new_uuid(), user)
        return operator
    
    def __eq__(self, other):
        if other is None or not isinstance(other, Operator):
            return False
        return self.id == other.id
    
    def __hash__(self):
        return hash(self.id)
