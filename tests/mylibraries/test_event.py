# -*- coding: utf-8 -*-

from mylibraries.domainevent import Event, Subscriber, Publisher


class TestDomainEvent:
    def test_base_event(self, event_setting):
        test = ""

        def handler(e):
            nonlocal test
            test = e.event_message
        
        Publisher.subscribe(Subscriber(handler, Event))
        
        Publisher.publish(Event(event_message="this is test"))
        
        assert "this is test" == test
    
    def test_derived_event(self, event_setting):
        class DerivedEvent(Event):
            pass

        test = ""
        times = 0

        def handler(e):
            nonlocal test
            test = e.event_message
            nonlocal times
            times += 1

        Publisher.subscribe(Subscriber(handler, Event, "test"))
        Publisher.subscribe(Subscriber(handler, DerivedEvent, "testderive"))
        
        Publisher.publish(DerivedEvent(event_message="this is derived test"))
        
        assert "this is derived test" == test
        assert times == 1
        
        times = 0
        
        Publisher.publish(Event(event_message="this is test"))
        
        assert "this is test" == test
        assert times == 2
    
    def test_subscriber_equals(self, event_setting):
        test = ""
    
        def handler(e):
            nonlocal test
            test = e.event_message
            
        s1 = Subscriber(handler, Event)
        s2 = Subscriber(handler, Event)
        
        assert not s1 == s2

        s3 = Subscriber(handler, Event, "testsubscriber")
        s4 = Subscriber(handler, Event, "testsubscriber")
        
        assert s3 == s4
        
    def test_clear_subscribers(self, event_setting):
        test = ""
    
        def handler(e):
            nonlocal test
            test = "test"
    
        Publisher.subscribe(Subscriber(handler, Event))

        Publisher.clear_subscribers()

        Publisher.publish(Event(event_message="this is test"))
        
        assert test == ''

        def handler2(e):
            nonlocal test
            test = "test2"
            
        Publisher.subscribe(Subscriber(handler, Event, "test"))
        Publisher.subscribe(Subscriber(handler2, Event, "test2"))

        Publisher.publish(Event())

        assert test == "test2"
        
        Publisher.clear_subscribers("test2")

        Publisher.publish(Event())
        assert test == "test"
