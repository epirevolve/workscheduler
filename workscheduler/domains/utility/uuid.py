# -*- coding: utf-8 -*-

from datetime import datetime
import time
import uuid


class UuidFactory:
    @classmethod
    def new_uuid(cls) -> str:
        return '{}-{}'.format(
            datetime.fromtimestamp(time.time()).strftime('%s%f'),
            uuid.uuid4()
        )
