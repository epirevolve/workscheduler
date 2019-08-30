# -*- coding: utf-8 -*-

import sys
import os

sys.path.append(os.path.abspath('./src'))

from applications.rpyccore.rpyc_scheduler import RPyCScheduler


if __name__ == "__main__":
    from rpyc.utils.server import ThreadedServer
    t = ThreadedServer(RPyCScheduler, port=3929)
    t.start()
