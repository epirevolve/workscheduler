# -*- coding: utf-8 -*-

import click
from flask.cli import with_appcontext
from flask import current_app

from infrastructures import Database
from infrastructures import InputData


def click_register(app):
    @app.cli.command('init-db')
    @with_appcontext
    def init_db_command():
        Database(current_app.config['DATABASE']).init()
        click.echo('Initialized the database.')

    @app.cli.command('input-test-data')
    @with_appcontext
    def set_test_db_command():
        Database(current_app.config['DATABASE']).init()
        InputData(current_app.config['DATABASE']).set_test()
        click.echo('Set the database to test.')

    @app.cli.command('input-data')
    @with_appcontext
    def input_data_command():
        Database(current_app.config['DATABASE']).init()
        InputData(current_app.config['DATABASE']).set_init()
        click.echo('Db initialized and input data.')
