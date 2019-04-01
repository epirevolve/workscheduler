# -*- coding: utf-8 -*-

from datetime import datetime

from mypackages.utils.datetime import is_overlap
from mypackages.utils.date import get_next_day

from workscheduler.domains.models.scheduler import Request
from ..errors import CalendarError
from ..errors import RequestError
from . import OperatorQuery
from . import SchedulerQuery


class RequestCommand:
    def __init__(self, session):
        self._session = session

    @staticmethod
    def _request_validity(operator_id, monthly_setting, new_request):
        for day in monthly_setting.days:
            for request in filter(lambda x: x.operator.id == operator_id, day.requests):
                if is_overlap(new_request.at_from, new_request.at_to,
                              request.at_from, request.at_to):
                    raise RequestError()

    def _add_request(self, scheduler_id: str, request: Request):
        scheduler = SchedulerQuery(self._session).get_scheduler(scheduler_id)
        search_date = request.at_from
        while search_date <= request.at_to:
            monthly_setting = scheduler.monthly_setting(search_date.month, search_date.year)
            self._request_validity(request.operator.id, monthly_setting, request)
            if not monthly_setting.is_published:
                raise CalendarError()
            while search_date.month == monthly_setting.month and search_date <= request.at_to:
                monthly_setting.days[search_date.day - 1].requests.append(request)
                search_date = get_next_day(search_date)
            search_date = get_next_day(search_date)

    def append_my_request(self, user_id: str, scheduler_id: str,
                          title: str, note: str, at_from: datetime, at_to: datetime) -> Request:
        operator = OperatorQuery(self._session).get_operator_of_user_id(user_id)
        request = Request.new_request(title, note, at_from,
                                      at_to, operator)
        self._add_request(scheduler_id, request)
        return request

    def update_my_request(self, scheduler_id: str, id_: str, title: str,
                          note: str, at_from: datetime, at_to: datetime) -> Request:
        requests = SchedulerQuery(self._session).get_requests_of_id(id_)
        operator_id = requests[0].operator.id
        for request in requests:
            self._session.delete(request)
        self._session.flush()
        request = Request(id_, title, note,
                          at_from, at_to, OperatorQuery(self._session).get_operator(operator_id))
        self._add_request(scheduler_id, request)
        return request

    def remove_my_request(self, id_: str):
        requests = SchedulerQuery(self._session).get_requests_of_id(id_)
        for request in requests:
            self._session.delete(request)
