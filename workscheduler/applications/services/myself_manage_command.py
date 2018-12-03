# -*- coding: utf-8 -*-

from mypackages.domainevent import (
    Event, Publisher
)
from workscheduler.applications.services import UserQuery


class StoreMyselfSucceeded(Event):
    pass


class StoreMyselfFailed(Event):
    pass


class MyselfManageCommand:
    def __init__(self, session):
        self._session = session
    
    def store_myself(self, id: str, password: str, name: str,
                     skill_ids: [str]):
        if not id:
            Publisher.publish(StoreMyselfFailed())
            return
        user = UserQuery(self._session).get_user(id)
        if not user:
            Publisher.publish(StoreMyselfFailed())
            return
        user.change_password(password)
        user.change_name(name)
        all_skills = UserQuery(self._session).get_skills()
        skills = [x for x in all_skills if x.id in skill_ids]
        user.change_skills(skills)
        Publisher.publish(StoreMyselfSucceeded())
