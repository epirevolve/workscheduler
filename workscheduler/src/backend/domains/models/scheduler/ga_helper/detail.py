# -*- coding: utf-8 -*-

"""Contains helper class of matching outlines and details."""
from collections import defaultdict
import math

import numpy as np

from utils.array import find

from .signs import work_day_sign
from .signs import holiday_sign
from .signs import fixed_schedule_day_sign
from .signs import day_off_sign

from logging import getLogger

_logger = getLogger(__name__)


class SchedulerDetailHelper:
    """Helper class for matching outline and factor.
    
    This helper adapt factor - detail work schedule category - to outline
    which requires detail work schedule category only. Evaluation of
    consistency rate is evaluated by day off continuity and holiday after day off.
    Except not property outlines for operator like not adapted requests or
    not saved time for fixed schedule.
    
    """
    
    def __init__(self, monthly_setting, operators, all_outlines):
        self._monthly_setting = monthly_setting
        self._operators = operators
        self._all_outlines = all_outlines
        self._least_attendance, self._participants = self._calc_least_attendance()
    
    def _calc_least_attendance(self):
        total_requires = defaultdict(int)
        for day in self._monthly_setting.days:
            for detail in day.details:
                total_requires[detail.work_category] += detail.require
        least_attendance = {}
        participants = {}
        for work_category, total_require in total_requires.items():
            other_exclusives = [x.exclusive_operators for x in total_requires.keys() if x != work_category]
            participants[work_category] = [x for x in self._operators if x not in work_category.impossible_operators
                                           and x not in other_exclusives]
            least_attendance[work_category] = math.floor(total_require / len(participants[work_category]))
        return least_attendance, participants

    @staticmethod
    def _random_pop(array):
        index = np.random.choice(array)
        array.remove(index)
        return index

    @staticmethod
    def _is_able_to_set_work_category(outline, index, work_category):
        if work_category.day_offs == 0:
            return True if outline[index] == work_day_sign else False
        max_index = len(outline) - 1
        day_offs = work_category.day_offs if max_index > index + work_category.day_offs \
            else max_index - index
        return all([x == work_day_sign for x in outline[index:index + day_offs + 1]]) \
            and (day_offs < work_category.day_offs or max_index < index + work_category.day_offs + 1
                 or outline[index + day_offs + 1] == holiday_sign)

    def _get_holiday_available_indices(self, outline, work_category):
        available_indices = []
        day_offs = work_category.day_offs
        for i, gene in list(enumerate(outline))[:-day_offs-1]:
            if self._is_able_to_set_work_category(outline, i, work_category):
                available_indices.append(i)
        if np.random.randint(1, 4) == 1:
            last_index = len(outline) - 1
            for i in range(day_offs, -1, -1):
                index = last_index - i
                if self._is_able_to_set_work_category(outline, index, work_category):
                    available_indices.append(index)
        return available_indices

    @staticmethod
    def _set_work_category(outline, index, work_category):
        max_index = len(outline) - 1
        outline[index] = work_category.id
        day_offs = work_category.day_offs if index + work_category.day_offs <= max_index \
            else max_index - index
        if day_offs == 0:
            return
        outline[index + 1: index + 1 + day_offs] = [day_off_sign] * day_offs

    def _set_work_categories_day_off(self, outline, work_category):
        available_indices = self._get_holiday_available_indices(outline, work_category)
        amplitude = np.random.choice([-1, 0, 1, 2], p=[0.05, 0.25, 0.35, 0.35])
        i = 0

        def set_work_category_day_off(index):
            self._set_work_category(outline, index, work_category)
        while i < self._least_attendance[work_category] + amplitude:
            if not available_indices:
                return outline
            index = self._random_pop(available_indices)
            for x in [x for x in available_indices if abs(index - x) <= work_category.day_offs]:
                available_indices.remove(x)
            set_work_category_day_off(index)
            i += 1
        return outline

    def _set_work_categories_not_day_off(self, outline, work_category):
        work_day_indices = [i for i, x in enumerate(outline) if x == work_day_sign]

        def set_work_category(index):
            self._set_work_category(outline, index, work_category)
        for _ in range(self._least_attendance[work_category]):
            if not work_day_indices:
                return outline
            index = self._random_pop(work_day_indices)
            set_work_category(index)
        return outline

    def _set_restrict_work_category(self, work_categories, outline):
        sorted_work_categories = sorted(work_categories, key=lambda x: x.day_offs, reverse=True)

        def _inner(index):
            for i in range(len(sorted_work_categories)):
                work_category = sorted_work_categories[i]
                if self._is_able_to_set_work_category(outline, index, work_category):
                    self._set_work_category(outline, index, work_category)
                    break
        return _inner

    def _set_work_categories(self, outline, work_categories):
        if not work_categories:
            outline = [' ' if x == work_day_sign else x for x in outline]
            return outline
        for work_category in work_categories:
            if not outline:
                break
            if work_category.day_offs != 0:
                outline = self._set_work_categories_day_off(outline, work_category)
            else:
                outline = self._set_work_categories_not_day_off(outline, work_category)
        else:
            set_random_work_category = self._set_restrict_work_category(work_categories, outline)
            for i in range(len(outline)):
                if outline[i] == work_day_sign:
                    set_random_work_category(i)
        return outline
    
    def _find_operator_work_categories(self, operator):
        work_categories = sorted(
            filter(lambda x: operator not in x.impossible_operators, self._least_attendance.keys()),
            key=lambda x: x.day_offs, reverse=True)
        is_exclusive = any([operator in x.exclusive_operators for x in work_categories])
        if is_exclusive:
            work_categories = filter(lambda x: operator in x.exclusive_operators, work_categories)
        return list(work_categories)
    
    def _set_fixed_schedules(self, outline, operator):
        if fixed_schedule_day_sign not in outline:
            return outline
        for day in self._monthly_setting.days:
            index = day.day - 1
            if outline[index] != fixed_schedule_day_sign:
                continue
            fixed_schedule = find(lambda x: operator in x.participants, day.fixed_schedules)
            outline[index] = fixed_schedule.id
        return outline

    @staticmethod
    def _set_holidays(outline):
        return [' ' if x == holiday_sign else x for x in outline]

    @staticmethod
    def _set_day_offs(outline):
        return ['-' if x == day_off_sign else x for x in outline]
    
    def _put_details(self, outlines, operator):
        combines = []
        work_categories = self._find_operator_work_categories(operator)
        outlines = [x[:] for x in outlines for _ in range(5)]
        for outline in outlines:
            outline = self._set_work_categories(outline, work_categories)
            outline = self._set_fixed_schedules(outline, operator)
            outline = self._set_holidays(outline)
            outline = self._set_day_offs(outline)
            if outline:
                combines.append(outline)
        return combines
    
    def run(self, *, logger=_logger):
        logger.info("""====================
## start filling details""")
        compatibles = [self._put_details(x, y) for x, y in zip(self._all_outlines, self._operators)]
        logger.info("""## finished
====================""")
        return compatibles
