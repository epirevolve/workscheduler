# -*- coding: utf-8 -*-

from setuptools import setup, find_packages


setup(
    name='workscheduler',
    version='0.0.1',
    description='provide work scheduler auto-builder',
    author='Yukihiro Ide',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Click',
        'cryptography',
        'git+https://github.com/epirevolve/eart.git@dd69856fc494aae35c7f86ba54cce8045d474201#egg=eart',
        'Flask'
        'Flask-Login',
        'mysqlclient',
        'numpy',
        'PyMySQL',
        'python-dotenv',
        'rpyc',
        'SQLAlchemy'
    ],
    setup_requires=[
    ],
)
