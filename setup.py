# -*- coding: utf-8 -*-

from setuptools import setup, find_packages


setup(
    name='workscheduler',
    version='0.0.1',
    description='provide work schedule auto-builder',
    author='Yukihiro Ide',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'flask'
    ],
    setup_requires=[
        'pytest-runner',
    ],
    tests_require=[
        'pytest',
    ],
)
