# -*- coding: utf-8 -*-

from flask_login import LoginManager

from applications.web.backend import get_db_session


def login_manager_register(app):
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'user.index'

    from applications.web.backend.services import UserQuery
    @login_manager.user_loader
    def load_user(user_id):
        return UserQuery(get_db_session()).get_user(user_id)

