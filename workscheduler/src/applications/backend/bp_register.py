# -*- coding: utf-8 -*-

from applications.backend.controllers.menu import bp as menu_bp
from applications.backend.controllers.user import bp as user_bp
from applications.backend.controllers.operator import bp as operator_bp
from applications.backend.controllers.scheduler import bp as scheduler_bp
from applications.backend.controllers.schedule import bp as schedule_bp

from applications.backend.controllers.user_api import bp as user_api_bp
from applications.backend.controllers.operator_api import bp as operator_api_bp
from applications.backend.controllers.scheduler_api import bp as scheduler_api_bp
from applications.backend.controllers.schedule_api import bp as schedule_api_bp

from applications.backend.controllers.util_api import bp as util_api_bp


def bp_register(app):
    app.register_blueprint(menu_bp, url_prefix="/menu")
    app.register_blueprint(user_bp, url_prefix="/user")
    app.register_blueprint(operator_bp, url_prefix="/operator")
    app.register_blueprint(scheduler_bp, url_prefix="/scheduler")
    app.register_blueprint(schedule_bp, url_prefix="/schedule")

    app.register_blueprint(user_api_bp, url_prefix="/user/api")
    app.register_blueprint(operator_api_bp, url_prefix="/operator/api")
    app.register_blueprint(scheduler_api_bp, url_prefix="/scheduler/api")
    app.register_blueprint(schedule_api_bp, url_prefix="/schedule/api")

    app.register_blueprint(util_api_bp, url_prefix="/util/api")

    # app.logger.debug(app.url_map)
