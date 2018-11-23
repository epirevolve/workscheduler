# -*- coding: utf-8 -*-

from mylibraries.domainevent import Event, Publisher
from workscheduler.applications.services.user_query import UserQuery
from workscheduler.domains.models.user.user import UserFactory


class StoreUserSucceeded(Event):
    pass


class StoreUserFailed(Event):
    pass


class ResetPasswordSucceeded(Event):
    pass


class UserManagingService:
    def __init__(self, session):
        self._session = session
    
    def store_user(self, id: str, login_id: str, name: str,
                   is_admin: str, is_operator: str):
        if not login_id:
            Publisher.publish(StoreUserFailed(event_message="login id is required"))
            return
        if not name:
            Publisher.publish(StoreUserFailed(event_message='name is required'))
            return
            
        is_admin = is_admin == 'on'
        is_operator = is_operator == 'on'

        if not id:
            self._session.add(UserFactory.join_a_member(login_id, 'p' + login_id, name, is_admin, is_operator))
        else:
            user = UserQuery(self._session).get_user(id)
            user.login_id = login_id
            user.name = name
            user.is_admin = is_admin
            user.is_operator = is_operator
        
        Publisher.publish(StoreUserSucceeded())
    
    def reset_password(self, id: str):
        if not id:
            return

        user = UserQuery(self._session).get_user(id)
        if not user:
            return
        user.reset_password()
        
        Publisher.publish(ResetPasswordSucceeded())

