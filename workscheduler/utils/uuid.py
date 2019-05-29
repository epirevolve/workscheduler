# -*- coding: utf-8 -*-

import time
import uuid


class UuidFactory:
    @classmethod
    def new_uuid(cls) -> str:
        return '{}-{}'.format(
            str(time.time()).replace('.', ''),
            uuid.uuid4()
        )
