# -*- coding: utf-8 -*-

from datetime import datetime


def to_time(value: str):
    return datetime.strptime(value, '%H:%M:%S').time()
