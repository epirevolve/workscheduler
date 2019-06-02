# -*- coding: utf-8 -*-

from datetime import datetime


def to_date(value: str, format="%Y-%m-%d"):
    return datetime.strptime(value, format).date()
