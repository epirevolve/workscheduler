# -*- coding: utf-8 -*-

from workscheduler.applications.services import (
    MyselfManageCommand, StoreMyselfFailed
)
from ..forms import MyselfForm
from mypackages.domainevent import Publisher


class MyselfManageCommandAdapter(MyselfManageCommand):
    def store_myself(self, form: MyselfForm):
        if not form.validate():
            for field, errors in form.errors.items():
                for error in errors:
                    Publisher.publish(StoreMyselfFailed(
                        event_message="Error in the {} field - {}".format(
                            getattr(form, field).label.text, error))
                        )
            return
        
        super(MyselfManageCommandAdapter, self).store_myself(
            form.id.data, form.password.data, form.name.data,
            map(lambda x: x.id, filter(lambda x: x.data, form.all_skills.form))
        )
