# -*- coding: utf-8 -*-

from datetime import datetime

from flask_login import current_user

from applications.services import RequestCommand


class RequestCommandAdapter:
    def __init__(self, session):
        self._session = session

    def append_my_request(self, scheduler_id: str, data: dict):
        title = data.get('title')
        note = data.get('note') or ''
        at_from_str = data.get('at_from')
        at_to_str = data.get('at_to')
        if not title or not at_from_str or not at_to_str:
            raise ValueError()
        at_from = datetime.strptime(at_from_str, '%Y-%m-%d %H:%M')
        at_to = datetime.strptime(at_to_str, '%Y-%m-%d %H:%M')
        return RequestCommand(self._session).append_my_request(
            current_user.id, scheduler_id, title,
            note, at_from, at_to
        )

    def update_my_request(self, scheduler_id: str, data: dict):
        id_ = data.get('id')
        title = data.get('title')
        note = data.get('note') or ''
        at_from_str = data.get('at_from')
        at_to_str = data.get('at_to')
        if not id_ or not title or not at_from_str or not at_to_str:
            raise ValueError()
        at_from = datetime.strptime(at_from_str, '%Y-%m-%d %H:%M')
        at_to = datetime.strptime(at_to_str, '%Y-%m-%d %H:%M')
        return RequestCommand(self._session).update_my_request(
            scheduler_id, id_, title,
            note, at_from, at_to
        )

    def remove_my_request(self, id_: str):
        return RequestCommand(self._session).remove_my_request(id_)
