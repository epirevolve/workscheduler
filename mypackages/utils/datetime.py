# -*- coding: utf-8 -*-

from datetime import datetime


def is_overlap(a_from: datetime, a_to: datetime, b_from: datetime, b_to: datetime):
    return (b_from <= a_from <= b_to) or (b_from <= a_to <= b_to)
