# -*- coding: utf-8 -*-

from applications.web.backend.services import SchedulerRPyC


class SchedulerRPyCAdapter:
    @staticmethod
    def launch(rpyc_conn: str, db_conn: str, data: dict):
        return SchedulerRPyC().launch(
            rpyc_conn, db_conn, data.get('team_id'), data.get('month'), data.get('year'))
