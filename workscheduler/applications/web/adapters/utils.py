# -*- coding: utf-8 -*-

from mypackages.domainevent import (
    Publisher, Event
)


def validate_form(form) -> bool:
    if not form.validate():
        for field, errors in form.errors.items():
            for error in errors:
                Publisher.publish(Event(
                    event_message="Error in the {} field - {}".format(
                        getattr(form, field).label.text, error)))
        return False
    return True

