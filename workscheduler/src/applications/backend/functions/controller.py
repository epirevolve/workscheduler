# -*- coding: utf-8 -*-

from functools import wraps

from flask import abort
from flask_login import current_user

from domains.models.user import UserRole


def admin_required(func):
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if current_user.role == UserRole.ADMINISTRATOR:
            return func(*args, **kwargs)
        else:
            abort(401)
    return decorated_view
