# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.orm import (
    relationship, validates
)
from sqlalchemy.types import (
    String, Integer
)
from utils.uuid import UuidFactory
from workscheduler.domains.models import OrmBase
from workscheduler.domains.models.user import User

associated_request_table\
    = Table("associated_request", OrmBase.metadata,
            Column('left_id', String, ForeignKey('operators.id')),
            Column('right_id', String, ForeignKey('requests.id')))

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
    user = relationship("User", uselist=False)
    requests = relationship("Request", secondary=associated_request_table)
    certified_skills = relationship("Skill", secondary=associated_skill_table)
    not_certified_skills = relationship("Skill", secondary=associated_skill_table)
    relations = relationship("Relation", secondary=associated_relation_table)
    remain_paid_holiday = Column(Integer, default=0)

    def __init__(self, id: str, user: User):
        self.id = id
        self.user = user
        self.requests = []
        self.certified_skills = []
        self.not_certified_skills = []
        self.relations = []

    @validates('id')
    def validate(self, key, value):
        return super(Operator, self).validate(Operator, key, value)

    @staticmethod
    def new_operator(user: User):
        operator = Operator(UuidFactory.new_uuid(), user)
        return operator
