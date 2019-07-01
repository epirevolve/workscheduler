# -*- coding: utf-8 -*-

from .util.controllers import menus_bp
from .models.user import auth_bp
from .models.user import teams_bp
from .models.user import users_bp
from .models.operator import operators_bp
from .models.operator import skills_bp
from .models.scheduler import requests_bp
from .models.scheduler import schedulers_bp
from .models.schedule import schedules_bp

from .models.user import users_api_bp
from .models.scheduler import schedulers_api_bp
from .models.schedule import schedules_api_bp
from .models.operator import operator_api_bp


def bp_register(app):
    app.register_blueprint(menus_bp, url_prefix="/menus")
    app.register_blueprint(auth_bp)
    app.register_blueprint(teams_bp, url_prefix="/teams")
    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(operators_bp, url_prefix="/operators")
    app.register_blueprint(skills_bp, url_prefix="/skills")
    app.register_blueprint(requests_bp, url_prefix="/requests")
    app.register_blueprint(schedulers_bp, url_prefix="/schedulers")
    app.register_blueprint(schedules_bp, url_prefix="/schedules")

    app.register_blueprint(users_api_bp, url_prefix="/user/api")
    app.register_blueprint(schedulers_api_bp, url_prefix="/scheduler/api")
    app.register_blueprint(schedules_api_bp, url_prefix="/schedule/api")
    app.register_blueprint(operator_api_bp, url_prefix="/operator/api")
