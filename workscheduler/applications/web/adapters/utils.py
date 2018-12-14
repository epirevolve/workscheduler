# -*- coding: utf-8 -*-

from flask import flash


def validate_form(form) -> bool:
    if not form.validate():
        for field, errors in form.errors.items():
            for error in errors:
                flash("Error in the {} field - {}".format(
                    getattr(form, field).label.text, error), 'error')
        return False
    return True
