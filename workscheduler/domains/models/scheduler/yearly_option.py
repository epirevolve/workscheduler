# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import String
from sqlalchemy.types import DateTime

from mypackages.utils.uuid import UuidFactory

from ..user import Affiliation
from . import SpecificVacation
from .. import OrmBase

associated_specific_vacation_table\
    = Table("associated_specific_vacation", OrmBase.metadata,
            Column("left_id", String, ForeignKey('yearly_options.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class YearlyOptions(OrmBase):
    __tablename__ = 'yearly_options'
    id = Column(String, primary_key=True)
    _affiliation_id = Column(String, ForeignKey('affiliations.id'))
    affiliation = relationship("Affiliation", uselist=False)
    specific_vacations = relationship("SpecificVacation", secondary=associated_specific_vacation_table)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id_: str, affiliation: Affiliation,
                 specific_vacations: [SpecificVacation]):
        self.id = id_
        self.affiliation = affiliation
        self.specific_vacations = specific_vacations
    
    @validates("id, affiliation")
    def validate(self, key, value):
        return super(YearlyOptions, self).validate(YearlyOptions, key, value)
    
    @staticmethod
    def new_option(affiliation: Affiliation, specific_vacations: [SpecificVacation]):
        return YearlyOptions(UuidFactory.new_uuid(), affiliation, specific_vacations)

