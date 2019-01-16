# -*- coding: utf-8 -*-

from datetime import (
    date, timedelta
)


def get_next_month(value: date = date.today()) -> date:
    return (value.replace(day=1) + timedelta(days=32)).replace(day=1)


def to_year_month_string(value: date) -> str:
    return value.strftime('%Y-%m')


def is_holiday(value: date) -> bool:
    return value.weekday() in [5, 6]


def is_between(value: date, at_from: date, at_to: date) -> bool:
    return at_from <= at_to and at_from <= value <= at_to
