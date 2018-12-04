# -*- coding: utf-8 -*-

from mypackages.domainevent import Publisher
from workscheduler.applications.services import (
    UserCommand, StoreUserFailed
)
from ..forms import UsersForm, UserForm


class UserCommandAdapter(UserCommand):
    def store_myself(self, form: UserForm):
        if not form.validate():
            for field, errors in form.errors.items():
                for error in errors:
                    Publisher.publish(StoreUserFailed(
                        event_message="Error in the {} field - {}".format(
                            getattr(form, field).label.text, error))
                    )
            return
        
        super(UserCommandAdapter, self).store_myself(
            form.id.data, form.password.data, form.name.data
        )
    
    def store_user(self, form: UsersForm):
        if not form.validate():
            for field, errors in form.errors.items():
                for error in errors:
                    Publisher.publish(StoreUserFailed(
                        event_message="Error in the {} field - {}".format(
                            getattr(form, field).label.text, error)))
            return
        
        super(UserCommandAdapter, self).store_user(
            form.id.data, form.login_id.data, form.name.data,
            form.is_admin.data, form.is_operator.data
        )
    
    def reset_password(self, form: UsersForm):
        super(UserCommandAdapter, self).reset_password(form.id.data)
