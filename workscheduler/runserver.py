# -*- coding: utf-8 -*-

# import modules
import sys
import os

sys.path.append(os.path.abspath('./src'))

from applications.web.app_factory import create_app

app = create_app()

if __name__ == '__main__':
    app.run(port=3928)
