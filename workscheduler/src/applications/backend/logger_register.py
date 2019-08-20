# -*- coding: utf-8 -*-

import os

from logging import getLogger
from logging import Formatter
from logging import handlers
from logging import INFO
from logging import DEBUG

from flask.logging import default_handler


def logger_register(app):
    base_path = os.path.abspath('/var/log')
    os.makedirs(base_path, exist_ok=True)
    handler = handlers.RotatingFileHandler(os.path.join(base_path, "workscheduler.log"),
                                           maxBytes=1024*1024*5, backupCount=5)
    handler.setLevel(INFO if not app.debug else DEBUG)
    formatter = Formatter('[%(asctime)s] %(levelname)s in %(module)s: %(message)s')
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)

    werkzeug_logger = getLogger('werkzeug')
    werkzeug_logger.addHandler(handler)
    werkzeug_logger.addHandler(default_handler)
