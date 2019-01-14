# -*- coding: utf-8 -*-

from sqlalchemy import (
    Column, Table, ForeignKey
)
from sqlalchemy.types import (
    String, Boolean, DateTime
)
from sqlalchemy.orm import (
    relationship, validates
)
from sqlalchemy.sql.functions import current_timestamp
from utils.uuid import UuidFactory
from workscheduler.domains.models.user import Belong
from .. import OrmBase
from . import WorkCategory


associated_work_category_table\
    = Table("associated_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('options.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class Options(OrmBase):
    __tablename__ = 'options'
    id = Column(String, primary_key=True)
    _belong_id = Column(String, ForeignKey('belongs.id'))
    belong = relationship("Belong", uselist=False)
    certified_skill = Column(Boolean)
    not_certified_skill = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, belong: Belong,
                 certified_skill: bool, not_certified_skill: bool,
                 work_categories: [WorkCategory]):
        self.id = id
        self.belong = belong
        self.certified_skill = certified_skill
        self.not_certified_skill = not_certified_skill
        self.work_categories = work_categories
    
    @validates("id, belong")
    def validate(self, key, value):
        return super(Options, self).validate(Options, key, value)
    
    @staticmethod
    def new_scheduler(belong: Belong, certified_skill: bool, not_certified_skill: bool,
                      work_categories: [WorkCategory]):
        return Options(UuidFactory.new_uuid(), belong,
                       certified_skill, not_certified_skill,
                       work_categories)
