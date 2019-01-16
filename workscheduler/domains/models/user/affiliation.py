# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.types import (
    String, DateTime
)
from sqlalchemy.sql.functions import current_timestamp
from workscheduler.domains.models import OrmBase
from mypackages.utils.uuid import UuidFactory


class Affiliation(OrmBase):
    __tablename__ = 'affiliations'
    id = Column(String, primary_key=True)
    name = Column(String(20), nullable=False)
    note = Column(String(50))
    create_at = Column(DateTime, server_default=current_timestamp())
    
    _not_affiliation_name = "未所属"
    
    def __init__(self, id: str, name: str, note: str):
        self.id = id
        self.name = name
        self.note = note

    @validates('id', 'name')
    def validate(self, key, value):
        return super(Affiliation, self).validate(Affiliation, key, value)
    
    def is_not_affiliation(self):
        return self.name == Affiliation._not_affiliation_name
    
    @staticmethod
    def new_affiliation(name: str, note: str):
        return Affiliation(UuidFactory.new_uuid(), name, note)
    
    @staticmethod
    def not_affiliation():
        return Affiliation.new_affiliation(Affiliation._not_affiliation_name,
                                 '新規ユーザはこの所属となります。\r\nオペレータ画面にて所属を変更してください。')
