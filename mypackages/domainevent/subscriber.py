# -*- coding: utf-8 -*-


class Subscriber:
    def __init__(self, handler, event_type: type, signature: str=""):
        self.handler = handler
        self.event_type = event_type
        self.signature = signature
        
    def __eq__(self, other):
        return isinstance(other, Subscriber)\
               and (self.signature == other.signature) if self.signature else super(Subscriber, self).__eq__(other)
