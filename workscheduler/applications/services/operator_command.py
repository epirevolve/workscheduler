# -*- coding: utf-8 -*-

from mypackages.domainevent import (
    Event, Publisher
)
from workscheduler.applications.services import OperatorQuery


class StoreUserSucceeded(Event):
    pass


class StoreUserFailed(Event):
    pass


class OperatorCommand:
    def __init__(self, session):
        self._session = session
    
    def store_myself(self, id: str, skill_ids: [str]):
        if not id:
            Publisher.publish(StoreUserFailed())
            return
        operator = OperatorQuery(self._session).get_operator(id)
        if not operator:
            Publisher.publish(StoreUserFailed())
            return
        all_skills = OperatorQuery(self._session).get_skills()
        skills = [x for x in all_skills if x.id in skill_ids]
        operator.change_skills(skills)
        Publisher.publish(StoreUserSucceeded())
