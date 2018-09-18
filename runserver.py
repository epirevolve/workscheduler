# -*- coding: utf-8 -*-

from workscheduler.applications.web import create_app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
