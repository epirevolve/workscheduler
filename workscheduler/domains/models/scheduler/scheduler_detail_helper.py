# -*- coding: utf-8 -*-

"""Contains helper class of matching outlines and details."""
from collections import defaultdict
import math

import numpy as np

from .scheduler_outline_helper import work_day_sign
from .scheduler_outline_helper import holiday_sign

day_off_sign = "-"


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
            least_attendance[work_category] = math.ceil(total_require / len(participants[work_category]))
        return least_attendance, participants
    
    def _set_work_category_day_off(self, outline, work_category):
        available_indices = []
        for i, gene in enumerate(outline):
            if gene != work_day_sign:
                continue
            day_offs = work_category.day_offs
            if i + day_offs > len(outline):
                day_offs = len(outline) - i
            if (i != len(outline) - 1 and not all([x == work_day_sign for x in outline[i: i + 1 + day_offs]])) \
                    or (i + day_offs + 1 < len(outline) and outline[i + day_offs + 1] != holiday_sign):
                continue
            available_indices.append(i)
        amplitude = np.random.choice([-1, 0, 1], p=[0.2, 0.7, 0.1])
        
        outline_indices = range(len(outline))
        i = 0
        while i < self._least_attendance[work_category] + amplitude:
            if not available_indices:
                return outline
            index = np.random.choice(outline_indices)
            if index not in available_indices:
                continue
            available_indices.remove(index)
            for x in outline_indices:
                if index - work_category.day_offs < x < index + work_category.day_offs:
                    available_indices.remove(x)
            outline[index] = work_category.id
            outline[index + 1: index + work_category.day_offs] = day_off_sign
            i += 1
        return outline
    
    def _set_work_category(self, outline, work_category):
        for _ in range(self._least_attendance[work_category]):
            work_day_indices = [i for i, x in enumerate(outline) if x == work_day_sign]
            if not work_day_indices:
                return outline
            index = np.random.choice(work_day_indices)
            outline[index] = work_category.id
        return outline
    
    def _set_work_categories(self, outline, work_categories):
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
    
    def _put_details(self, outlines):
        combines = []
        for outline in outlines:
            work_categories = sorted(self._least_attendance.keys(), key=lambda x: x.day_offs, reverse=True)
            outline = self._set_work_categories(outline, work_categories)
            if outline:
                combines.append(outline)
        return combines
    
    def run(self):
        print("""====================
## start outlines and factors matching""")
        compatibles = [self._put_details(x) for x in self._all_outlines]
        print("""## finished
====================""")
        return compatibles
