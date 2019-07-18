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
    def _get_holiday_available_indices(outline, work_category):
        available_indices = []
        day_offs = work_category.day_offs
        for i, gene in filter(lambda x: x[1] == work_day_sign, list(enumerate(outline))[:-day_offs-1]):
            if not all([x == work_day_sign for x in outline[i: i + day_offs + 1]]) \
                    or outline[i + day_offs + 1] != holiday_sign:
                continue
            available_indices.append(i)
        if np.random.randint(1, 3) == 1:
            last_index = len(outline) - 1
            for i in range(day_offs, 0, -1):
                if outline[-i:] == [work_day_sign] * i:
                    for l in range(0, i + 1):
                        available_indices.append(last_index - l)
                    break
        return available_indices
    
    def _set_work_category_day_off(self, outline, work_category):
        available_indices = self._get_holiday_available_indices(outline, work_category)
        amplitude = np.random.choice([-1, 0, 1, 2], p=[0.05, 0.3, 0.35, 0.3])
        outline_len = len(outline)
        i = 0
        while i < self._least_attendance[work_category] + amplitude:
            if not available_indices:
                return outline
            index = np.random.choice(available_indices)
            available_indices.remove(index)
            for x in [x for x in available_indices if abs(index - x) <= work_category.day_offs]:
                available_indices.remove(x)
            outline[index] = work_category.id
            day_offs = work_category.day_offs if index + work_category.day_offs < outline_len\
                else outline_len - index - 1
            outline[index + 1: index + 1 + day_offs] = [day_off_sign] * day_offs
            i += 1
        return outline

    def _set_work_category(self, outline, work_category):
        work_day_indices = [i for i, x in enumerate(outline) if x == work_day_sign]
        for _ in range(self._least_attendance[work_category]):
            if not work_day_indices:
                return outline
            index = np.random.choice(work_day_indices)
            work_day_indices.remove(index)
            outline[index] = work_category.id
        return outline
    
    def _set_work_categories(self, outline, work_categories):
        if not work_categories:
            outline = [' ' if x == work_day_sign else x for x in outline]
            return outline
        for work_category in work_categories:
            if not outline:
                break
            if work_category.day_offs != 0:
                outline = self._set_work_category_day_off(outline, work_category)
            else:
                outline = self._set_work_category(outline, work_category)
        else:
            outline = [work_categories[-1].id if x == work_day_sign else x for x in outline]
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
    
    def _put_details(self, outlines, operator):
        combines = []
        work_categories = self._find_operator_work_categories(operator)
        outlines = [x[:] for x in outlines for _ in range(5)]
        for outline in outlines:
            outline = self._set_work_categories(outline, work_categories)
            outline = self._set_fixed_schedules(outline, operator)
            if outline:
                combines.append(outline)
        return combines
    
    def run(self):
        print("""====================
## start filling details""")
        compatibles = [self._put_details(x, y) for x, y in zip(self._all_outlines, self._operators)]
        print("""## finished
====================""")
        return compatibles
