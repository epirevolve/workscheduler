# -*- coding: utf-8 -*-

import rpyc


class SchedulerRPyC:
    @staticmethod
    def launch(db_conn: str, rpyc_conn: str, team_id: str, month: int, year: int):
        conn = rpyc.connect(rpyc_conn, 3929)
        alauncher = rpyc.async_(conn.root.launch_scheduler)
        alauncher(db_conn, team_id, month, year)

