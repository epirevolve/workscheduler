# -*- coding: utf-8 -*-

from workscheduler.domains.models.user import Belong


class BelongQuery:
    def __init__(self, session):
        self._session = session
    
    def get_belong(self, id: str):
        return self._session.query(Belong).get(id)

    def get_belongs(self):
        return self._session.query(Belong).order_by(Belong.id).all()
    
    def get_default_belong(self):
        return next(filter(lambda x: x.is_not_belong(), self.get_belongs()))
    
    def get_belongs_without_default(self):
        default_belong = self.get_default_belong()
        belongs = [b for b in self.get_belongs() if not b.id == default_belong.id]
        return belongs
