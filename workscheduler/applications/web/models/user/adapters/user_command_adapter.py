# -*- coding: utf-8 -*-

from workscheduler.applications.services import UserCommand
from workscheduler.applications.web.util.functions.adapter import validate_form
from ..forms import UsersForm


class UserCommandAdapter(UserCommand):
    def update_myself(self, data):
        super(UserCommandAdapter, self).update_myself(
            data.get('id'), data.get('password'), data.get('name')
        )
    
    def append_user(self, form: UsersForm):
        if not validate_form(form):
            return
        return super(UserCommandAdapter, self).append_user(
            form.login_id.data, form.name.data,
            form.affiliation.data, form.is_admin.data, form.is_operator.data
        )
    
    def update_user(self, form: UsersForm):
        if not validate_form(form):
            return
        super(UserCommandAdapter, self).update_user(
            form.id.data, form.login_id.data, form.name.data,
            form.affiliation.data, form.is_admin.data, form.is_operator.data
        )
    
    def reset_password(self, request):
        id = request.get('id')
        if not id:
            raise ValueError()
        super(UserCommandAdapter, self).reset_password(id)

    def inactivate(self, request):
        id = request.get('id')
        if not id:
            raise ValueError()
        super(UserCommandAdapter, self).inactivate(id)
