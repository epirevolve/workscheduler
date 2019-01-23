# -*- coding: utf-8 -*-

import pytest
from mypackages.domainevent import Publisher


@pytest.fixture
def event_setting():
    Publisher.clear_subscribers()
    yield
    Publisher.clear_subscribers()

