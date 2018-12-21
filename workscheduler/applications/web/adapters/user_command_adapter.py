# -*- coding: utf-8 -*-

from workscheduler.applications.services import (
    UserCommand, BelongQuery
)
from ..forms import UsersForm, UserForm
from .utils import validate_form


class UserCommandAdapter(UserCommand):
    def update_myself(self, form: UserForm):
        if not validate_form(form):
            return
        super(UserCommandAdapter, self).update_myself(
            form.id.data, form.password.data, form.name.data
        )
    
    def append_user(self, form: UsersForm):
        if not validate_form(form):
            return
        belong = BelongQuery(self._session).get_belong(form.belong.data)
        return super(UserCommandAdapter, self).append_user(
            form.login_id.data, form.name.data,
            belong, form.is_admin.data, form.is_operator.data
        )
    
    def update_user(self, form: UsersForm):
        if not validate_form(form):
            return
        belong = BelongQuery(self._session).get_belong(form.belong.data)
        super(UserCommandAdapter, self).update_user(
            form.id.data, form.login_id.data, form.name.data,
            belong, form.is_admin.data, form.is_operator.data
        )
    
    def reset_password(self, form: UsersForm):
        if not form.id.data:
            raise ValueError()
        super(UserCommandAdapter, self).reset_password(form.id.data)
