# -*- coding: utf-8 -*-

from datetime import datetime

from workscheduler.utils import is_overlap


class TestDateTime:
    def test_is_overlap(self):
        a1 = datetime(2019, 1, 10, 9, 30)
        a2 = datetime(2019, 1, 12, 18, 00)
        b1 = datetime(2019, 1, 9, 9, 30)
        b2 = datetime(2019, 1, 10, 9, 30)
        assert is_overlap(a1, a2, b1, b2)
        assert is_overlap(b1, b2, a1, a2)
        b1 = datetime(2019, 1, 11, 9, 30)
        b2 = datetime(2019, 1, 13, 9, 30)
        assert is_overlap(a1, a2, b1, b2)
        b1 = datetime(2019, 1, 9, 9, 30)
        assert is_overlap(a1, a2, b1, b2)
        b2 = datetime(2019, 1, 10, 9, 29)
        assert not is_overlap(a1, a2, b1, b2)
        b2 = datetime(2019, 1, 10, 9, 30)
        assert is_overlap(a1, a2, b1, b2)
