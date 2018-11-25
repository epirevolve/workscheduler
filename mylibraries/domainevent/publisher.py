# -*- coding: utf-8 -*-

from .subscriber import Subscriber
from .event import Event


class Publisher:
    _isPublishing = False
    _subscribers = []
    
    @staticmethod
    def subscribe(subscriber: Subscriber):
        if Publisher._isPublishing:
            return
        if len(list(filter(lambda x: x == subscriber, Publisher._subscribers))):
            Publisher.clear_subscribers(subscriber.signature)
        Publisher._subscribers.append(subscriber)
    
    @staticmethod
    def publish(event: Event):
        Publisher._isPublishing = True
        for subscriber in list(filter(lambda x: issubclass(x.event_type, type(event)), Publisher._subscribers)):
            subscriber.handler(event)
        Publisher._isPublishing = False
    
    @staticmethod
    def clear_subscribers(signature: str=""):
        if signature:
            for subscriber in list(filter(lambda x: x.signature == signature, Publisher._subscribers)):
                Publisher._subscribers.remove(subscriber)
        else:
            Publisher._subscribers.clear()
