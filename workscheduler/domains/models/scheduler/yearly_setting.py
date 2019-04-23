# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.types import Integer
from sqlalchemy.types import String

from mypackages.utils.uuid import UuidFactory

from .. import OrmBase

associated_specific_vacation_table\
    = Table("associated_vacation", OrmBase.metadata,
            Column("left_id", String, ForeignKey('yearly_settings.id')),
            Column("right_id", String, ForeignKey('vacations.id')))


class YearlySetting(OrmBase):
    __tablename__ = 'yearly_settings'
    id = Column(String, primary_key=True)
    year = Column(Integer)
    vacations = relationship("Vacation", secondary=associated_specific_vacation_table, lazy='subquery')
    
    def __init__(self, id_: str, year: int):
        self.id = id_
        self.year = year
        self.vacations = []
    
    @validates("id")
    def validate(self, key, value):
        return super(YearlySetting, self).validate(YearlySetting, key, value)
    
    @staticmethod
    def new_yearly_setting(year: int):
        return YearlySetting(UuidFactory.new_uuid(), year)
    
    def __eq__(self, other):
        if other is None or not isinstance(other, YearlySetting):
            return False
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
