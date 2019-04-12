# -*- coding: utf-8 -*-

from datetime import datetime
from datetime import time
from datetime import timedelta


def get_time_diff(val_from: time, val_to: time):
    val_from_del = timedelta(hours=val_from.hour, minutes=val_from.minute)
    val_to_del = timedelta(hours=val_to.hour, minutes=val_to.minute)
    if val_from_del > val_to_del:
        val_to_del = val_to_del + timedelta(hours=24)
    return (datetime.min + (val_to_del - val_from_del)).time()


def time_to_hour(val: time):
    return val.hour + val.minute / 60
