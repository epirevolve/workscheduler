# -*- coding: utf-8 -*-

from workscheduler.applications.services import AuthFacade


class AuthFacadeAdapter(AuthFacade):
    def login(self, data):
        return super(AuthFacadeAdapter, self).login(
            data.get('loginId'), data.get('password'))
