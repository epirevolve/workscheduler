# -*- coding: utf-8 -*-

from datetime import datetime


def to_date(value: str):
    return datetime.strptime(value, '%Y-%m-%d').date()


def to_time(value: str):
    return datetime.strptime(value, '%H:%M:%S').time()
