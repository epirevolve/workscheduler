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
from workscheduler.domains.utils.uuid import UuidFactory
from workscheduler.domains.models.user import Belong
from .. import OrmBase
from . import WorkCategory


associated_work_category_table\
    = Table("associated_work_category", OrmBase.metadata,
            Column("left_id", String, ForeignKey('schedulers.id')),
            Column("right_id", String, ForeignKey('work_categories.id')))


class Scheduler(OrmBase):
    __tablenames__ = 'schedulers'
    id = Column(String, primary_key=True)
    _belong_id = Column(String, ForeignKey('belongs.id'))
    belong = relationship("Belong", uselist=False)
    use_certified_skills = Column(Boolean)
    use_not_certified_skills = Column(Boolean)
    work_categories = relationship("WorkCategory", secondary=associated_work_category_table)
    create_at = Column(DateTime, server_default=current_timestamp())
    
    def __init__(self, id: str, belong: Belong,
                 use_certified_skills: bool, use_not_certified_skills: bool,
                 work_categories: [WorkCategory]):
        self.id = id
        self.belong = belong
        self.use_certified_skills = use_certified_skills
        self.use_not_certified_skills = use_not_certified_skills
        self.work_categories = work_categories
    
    @validates("id, belong")
    def validate(self, key, value):
        return super(Scheduler, self).validate(Scheduler, key, value)
    
    @staticmethod
    def new_scheduler(belong: Belong, use_certified_skills: bool, use_not_certified_skills: bool,
                      work_categories: [WorkCategory]):
        return Scheduler(UuidFactory.new_uuid(), belong,
                         use_certified_skills, use_not_certified_skills,
                         work_categories)