# -*- coding: utf-8 -*-

import re
import json
from datetime import datetime
from datetime import date
from datetime import time

from flask import Response


def to_capitalize(s):
    if '_' not in s:
        return s
    parts = s.split('_')
    return ''.join([y if x == 0 else y.capitalize() for x, y in enumerate(parts)])


def to_dict(obj):
    ret = None
    if isinstance(obj, dict):
        ret = {to_capitalize(k): to_dict(v) for k, v in obj.items() if not str(k).startswith('_')}
    elif isinstance(obj, list):
        ret = [to_dict(v) for v in obj]
    elif hasattr(obj, '__dict__'):
        return to_dict(obj.__dict__)
    return ret or obj


def json_serial(obj):
    if isinstance(obj, (datetime, date, time)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))


def dumps(obj):
    return json.dumps(to_dict(obj), default=json_serial, indent=2, separators=(', ', ': '))


def to_snake(s):
    first_cap_re = re.compile('(.)([A-Z][a-z]+)')
    all_cap_re = re.compile('([a-z0-9])([A-Z])')
    
    def convert(name):
        s1 = first_cap_re.sub(r'\1_\2', name)
        return all_cap_re.sub(r'\1_\2', s1).lower()
    
    return convert(s)


def recursive_to_snake(obj):
    ret = None
    if isinstance(obj, dict):
        ret = {to_snake(k): recursive_to_snake(v) for k, v in obj.items()}
    if isinstance(obj, list):
        ret = [recursive_to_snake(v) for v in obj]
    return ret or obj


def loads(obj):
    data = json.loads(obj)
    return recursive_to_snake(data)


def json_response(content='', *, status_code=200):
    res = Response(content, mimetype='application/json')
    res.status_code = status_code
    return res
