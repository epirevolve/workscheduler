# -*- coding: utf-8 -*-

from functools import wraps

from flask import abort
from flask_login import current_user


def admin_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if current_user.is_admin:
            return func(*args, **kwargs)
        else:
            abort(401)
    return decorated_view
