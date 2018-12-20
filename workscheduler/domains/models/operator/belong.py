# -*- coding: utf-8 -*-

from sqlalchemy import Column
from sqlalchemy.orm import validates
from sqlalchemy.types import (
    String, DateTime
)
from sqlalchemy.sql.functions import current_timestamp
from workscheduler.domains.models import OrmBase
from workscheduler.domains.utils.uuid import UuidFactory


class Belong(OrmBase):
    __tablename__ = 'belongs'
    id = Column(String, primary_key=True)
    name = Column(String(20), nullable=False)
    note = Column(String(50))
    create_at = Column(DateTime, server_default=current_timestamp())
    
    _not_belong_name = "未所属"
    
    def __init__(self, id: str, name: str, note: str):
        self.id = id
        self.name = name
        self.note = note

    @validates('id', 'name')
    def validate(self, key, value):
        return super(Belong, self).validate(Belong, key, value)
    
    def is_not_belong(self):
        return self.name == Belong._not_belong_name
    
    @staticmethod
    def create_new_belongs(name: str, note: str):
        return Belong(UuidFactory.new_uuid(), name, note)
    
    @staticmethod
    def create_not_belong():
        return Belong.create_new_belongs(Belong._not_belong_name,
                                         '新規ユーザはこの所属となります。\r\nオペレータ画面にて所属を変更してください。')
