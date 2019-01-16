# -*- coding: utf-8 -*-

from datetime import datetime
from mypackages.utils.date import (
    get_next_month, to_year_month_string, is_holiday,
    is_between
)


class TestDate:
    def test_get_next_month(self):
        next_month = get_next_month()
        today = datetime.today()
        if today.month == 12:
            assert next_month.month == 1
            assert next_month.year == today.year + 1
        else:
            assert next_month.month == today.month + 1
            assert next_month.year == today.year

    def test_to_year_month_string(self):
        value = datetime(2019, 12, 31)
        string = to_year_month_string(value)
        assert string == "2019-12"

    def test_is_holiday(self):
        value = datetime(2019, 1, 16)
        assert not is_holiday(value)
        value = datetime(2019, 1, 14)
        assert not is_holiday(value)
        value = datetime(2019, 5, 11)
        assert is_holiday(value)
        value = datetime(2020, 4, 19)
        assert is_holiday(value)

    def test_is_between(self):
        a = datetime(2019, 1, 14)
        b = datetime(2019, 1, 16)
        c = datetime(2019, 1, 15)
        assert is_between(c, a, b)
        assert not is_between(b, a, c)
        assert not is_between(c, b, a)
        d = datetime(2018, 12, 30)
        e = datetime(2019, 1, 1)
        f = datetime(2018, 12, 31)
        assert is_between(f, d, e)
        assert is_between(f, d, f)
