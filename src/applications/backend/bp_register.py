# -*- coding: utf-8 -*-

from backend.controllers.menu import bp as menu_bp
from backend.controllers.user import bp as user_bp
from backend.controllers.operator import bp as operator_bp
from backend.controllers.scheduler import bp as scheduler_bp
from backend.controllers.schedule import bp as schedule_bp

from backend.controllers.user import bp as user_api_bp
from backend.controllers.scheduler import bp as scheduler_api_bp
from backend.controllers.schedule import bp as schedule_api_bp
from backend.controllers.operator import bp as operator_api_bp


def bp_register(app):
    app.register_blueprint(menu_bp, url_prefix="/menu")
    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(operator_bp, url_prefix="/operator")
    app.register_blueprint(scheduler_bp, url_prefix="/scheduler")
    app.register_blueprint(schedule_bp, url_prefix="/schedule")

    app.register_blueprint(user_api_bp, url_prefix="/user/api")
    app.register_blueprint(scheduler_api_bp, url_prefix="/scheduler/api")
    app.register_blueprint(schedule_api_bp, url_prefix="/schedule/api")
    app.register_blueprint(operator_api_bp, url_prefix="/operator/api")
