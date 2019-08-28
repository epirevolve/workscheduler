# -*- coding: utf-8 -*-

from time import strftime
from time import localtime

from logging import getLogger

import rpyc

from infrastructures import Database

from applications.core.services import SchedulerFacade


logger = getLogger(__file__)


class RPyCScheduler(rpyc.Service):
    def on_connect(self, conn):
        pass

    def on_disconnect(self, conn):
        pass

    def exposed_launch_scheduler(self, connection: str, team_id: str, month: int, year: int):
        session = Database(connection).create_session()
        try:
            logger.info("#### start time: {}".format(strftime("%a, %d %b %Y %H:%M:%S", localtime())))
            SchedulerFacade(session).launch(team_id, month, year)
            logger.info("#### fin time: {}".format(strftime("%a, %d %b %Y %H:%M:%S", localtime())))
        finally:
            session.close()
