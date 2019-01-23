# -*- coding: utf-8 -*-

from mypackages.utils.uuid import UuidFactory


class TestUuid:
    def test_uuid(self):
        uuid1 = UuidFactory.new_uuid()
        uuid2 = UuidFactory.new_uuid()
        assert uuid1 != uuid2
        assert uuid1 == uuid1
