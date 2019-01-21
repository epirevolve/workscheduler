# -*- coding: utf-8 -*-

from workscheduler.applications.services import AuthFacade
from ..forms import AuthForm


class AuthFacadeAdapter(AuthFacade):
    def login(self, form: AuthForm):
        if not form.validate_on_submit():
            raise ValueError()
        return super(AuthFacadeAdapter, self).login(
            form.login_id.data, form.password.data)
