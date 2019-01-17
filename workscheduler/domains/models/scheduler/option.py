# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.orm import (
    relationship, validates
)
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.types import (
    String, Boolean, DateTime
)

from mypackages.utils.uuid import UuidFactory
from workscheduler.domains.models.user import Affiliation
from . import WorkCategory
from .. import OrmBase

associated_work_category_table\
    = Table("associated_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('options.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class Options(OrmBase):
    __tablename__ = 'options'
    id = Column(String, primary_key=True)
    _affiliation_id = Column(String, ForeignKey('affiliations.id'))
    affiliation = relationship("Affiliation", uselist=False)
    certified_skill = Column(Boolean)
    not_certified_skill = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id_: str, affiliation: Affiliation,
                 certified_skill: bool, not_certified_skill: bool,
                 work_categories: [WorkCategory]):
        self.id = id_
        self.affiliation = affiliation
        self.certified_skill = certified_skill
        self.not_certified_skill = not_certified_skill
        self.work_categories = work_categories
    
    @validates("id, affiliation")
    def validate(self, key, value):
        return super(Options, self).validate(Options, key, value)
    
    @staticmethod
    def new_option(affiliation: Affiliation, certified_skill: bool, not_certified_skill: bool,
                   work_categories: [WorkCategory]):
        return Options(UuidFactory.new_uuid(), affiliation,
                       certified_skill, not_certified_skill,
                       work_categories)
