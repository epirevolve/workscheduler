# -*- coding: utf-8 -*-

from datetime import (
    date, timedelta
)


def get_next_month():
    return (date.today().replace(day=1) + timedelta(days=32)).strftime('%Y-%m')
