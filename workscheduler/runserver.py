# -*- coding: utf-8 -*-

from source.applications.web import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
