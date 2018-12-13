# -*- coding: utf-8 -*-

from workscheduler.applications.services import AuthCommand
from ..forms import AuthForm


class AuthCommandAdapter(AuthCommand):
    def login(self, form: AuthForm):
        if not form.validate_on_submit():
            raise ValueError()
        return super(AuthCommandAdapter, self).login(
            form.login_id.data, form.password.data)
