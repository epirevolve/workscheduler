# -*- coding: utf-8 -*-

from datetime import date
from datetime import datetime


def to_date(value, format='%Y/%m/%d'):
    try:
        return datetime.strptime(value, format).date()
    except ValueError:
        return date.today()
