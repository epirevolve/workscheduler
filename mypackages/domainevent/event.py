# -*- coding: utf-8 -*-

from datetime import datetime


class Event:
    def __init__(self, event_version=0, event_message="", timestamp=None):
        self.event_version = event_version
        self.event_message = event_message
        self.timestamp = timestamp or datetime.now()
