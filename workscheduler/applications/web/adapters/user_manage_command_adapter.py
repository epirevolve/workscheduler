# -*- coding: utf-8 -*-

from workscheduler.applications.services import (
    UserManageCommand, StoreUserFailed
)
from mypackages.domainevent import Publisher
from ..forms import UsersForm


class UserManageCommandAdapter(UserManageCommand):
    def store_user(self, form: UsersForm):
        if not form.validate():
            for field, errors in form.errors.items():
                for error in errors:
                    Publisher.publish(StoreUserFailed(
                        event_message="Error in the {} field - {}".format(
                            getattr(form, field).label.text, error)))
            return
        
        super(UserManageCommandAdapter, self).store_user(
            form.id.data, form.login_id.data, form.name.data,
            form.is_admin.data, form.is_operator.data
        )
    
    def reset_password(self, form: UsersForm):
        super(UserManageCommandAdapter, self).reset_password(form.id.data)
