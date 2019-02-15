# -*- coding: utf-8 -*-

import json
from datetime import date
from datetime import datetime


def to_dict(obj):
    ret = None
    if isinstance(obj, dict):
        ret = {k: to_dict(v) for k, v in obj.items() if not str(k).startswith('_')}
    if isinstance(obj, list):
        ret = [to_dict(v) for v in obj]
    elif hasattr(obj, '__dict__'):
        return to_dict(obj.__dict__)
    return ret or obj


def json_serial(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))


def to_json(obj):
    return json.dumps(to_dict(obj), default=json_serial)
