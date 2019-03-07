# -*- coding: utf-8 -*-


def map_id(data: dict):
    return map(lambda x: x.get('id'), data)


def list_id(data: dict):
    return list(map_id(data))
