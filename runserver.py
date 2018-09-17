# -*- coding: utf-8 -*-

from workscheduler.applications.web import create_app

app = create_app()
app.run(debug=True)
