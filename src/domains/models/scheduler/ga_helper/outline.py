# -*- coding: utf-8 -*-

"""Contains helper class which make outline of schedule."""
from itertools import groupby
from itertools import chain
import math
from multiprocessing import Pool
import multiprocessing as multi

from eart import Genetic

from utils.array import find

from .ga_helper import build_parent_selection
from .ga_helper import build_survivor_selection
from .ga_helper import build_mutation_unique
from .ga_helper import build_crossover_unique

from .signs import work_day_sign
from .signs import fixed_schedule_day_sign
from .signs import holiday_sign
from .signs import day_off_sign
from .signs import n_day_sign


class SchedulerOutlineHelper:
    """Helper class for individual schedule outlines.
    
    This helper create a work scheduling which make daily schedule like work, holiday,
    or fixed schedule like training by ga. Daily schedule properlity is evaluated
    by number of holiday, continuity of work day, adoption rate of operator request,
    and save a day for fixed schedule.
    
    """
    
    def __init__(self, work_categories, monthly_setting, operators, last_month_schedules):
        """Prepare to run a scheduling.
        
        Obtain daily requests and daily fixed schedules from monthly setting and make a bit of change.
        Daily requests are changed into request operator's id list and daily fixed schedule
        are changed into participant's id list.
        
        Args:
            monthly_setting (MonthlySetting): monthly setting of target year and month.
            operators (list of Operator): active operators of making work schedule.
        
        """
        self._last_month_schedules = last_month_schedules
        self._work_categories = work_categories
        self._monthly_setting = monthly_setting
        self._operators = operators
        self._daily_requests = [[y.operator for y in x.requests] for x in self._monthly_setting.days]
        self._daily_fixed_schedules = [list(chain.from_iterable(y.participants for y in x.fixed_schedules))
                                       for x in self._monthly_setting.days]

    @staticmethod
    def _evaluate_by_continuous_attendance(gene, weight):
        ratio = weight / len(gene)
        continuous_attendance = [(y, len([_ for _ in z])) for y, z in groupby(gene, key=lambda x: x in [holiday_sign, n_day_sign])]
        adaptability = sum([ratio * y for x, y in continuous_attendance if y > 5 and not x])
        adaptability += sum([ratio * y for x, y in continuous_attendance[1:-1] if y < 2 and not x])
        return weight - min(weight, adaptability)
    
    @staticmethod
    def _evaluate_by_holiday_continuity(gene, weight):
        continuous_holiday = [sum(1 for _ in z) for y, z in groupby(gene, key=lambda x: x in [holiday_sign, n_day_sign]) if y]
        ratio = weight / (sum(continuous_holiday) or 1)
        adaptability = ratio * len([x for x in continuous_holiday if x > 2])
        if 2 not in continuous_holiday:
            adaptability += ratio * 5
        return weight - min(weight, adaptability)
    
    def _evaluate_by_week_day_operator(self, gene, operator, weight):
        is_week_day_operator = any([operator in x.week_day_operators for x in self._work_categories])
        ratio = weight / len(gene)
        if not is_week_day_operator:
            return weight
        adaptability = sum([ratio for x, y, z in zip(gene, self._monthly_setting.days, self._daily_requests)
                            if not y.is_holiday and x != work_day_sign and operator not in z])
        return weight - min(weight, adaptability)

    def _evaluate_by_request(self, gene, operator):
        ratio = 0.2
        adaptability = sum([ratio for x, y in zip(gene, self._daily_requests)
                            if operator in y and x not in [holiday_sign, n_day_sign]])
        return max(0, 1 - adaptability)

    def _evaluate_by_fixed_schedule(self, gene, operator):
        ratio = 0.2
        adaptability = 0
        for schedule, fixed_schedule_participants in zip(gene, self._daily_fixed_schedules):
            if operator in fixed_schedule_participants and schedule != fixed_schedule_day_sign:
                adaptability += ratio
            if operator not in fixed_schedule_participants and schedule == fixed_schedule_day_sign:
                adaptability += ratio
        return max(0, 1 - adaptability)

    @staticmethod
    def _translate_as_gene(indices, base):
        return [base[i] for i in indices]

    def _evaluate(self, operator, base):
        def _fnc(loci):
            adaptability = 3
            protein = self._translate_as_gene(loci, base)
            adaptability += self._evaluate_by_continuous_attendance(protein, 4)
            adaptability += self._evaluate_by_holiday_continuity(protein, 3)
            adaptability += self._evaluate_by_week_day_operator(protein, operator, 10)
            adaptability *= self._evaluate_by_request(protein, operator)
            adaptability *= self._evaluate_by_fixed_schedule(protein, operator)
            return adaptability
        return _fnc

    def _need_unique_schedule(self, operator):
        return operator in set([y for x in self._daily_requests for y in x])\
               or operator in set([y for x in self._daily_fixed_schedules for y in x])\
               or operator in set([y for x in self._work_categories for y in x.week_day_operators])

    def _genetic_wrapper(self, args):
        operator, base_pool = args
        genetic = Genetic(evaluation=self._evaluate(operator, base_pool),
                          base_kind=range(len(self._monthly_setting.days)), homo_progeny_restriction=True,
                          saturated_limit=60, generation_size=1000, population_size=500)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation_unique()
        genetic.crossover = build_crossover_unique()
        genetic.compile()
        return genetic.run()

    def _calc_residue_last_month(self, operator):
        if not self._last_month_schedules:
            return 0, False
        last_schedules = list(filter(lambda x: x.operator == operator, self._last_month_schedules.components))
        if not last_schedules:
            return 0, False
        last_schedules = last_schedules[0]
        day_off_work_categories = list(filter(lambda x: x.day_offs > 0, self._work_categories))
        target_sign = last_schedules.day_work_categories[-1]
        if target_sign != day_off_sign and target_sign not in map(lambda x: x.id, day_off_work_categories):
            return 0, False

        for i in range(1, len(self._monthly_setting.days)+1):
            target_sign = last_schedules.day_work_categories[-i]
            if target_sign in map(lambda x: x.id, day_off_work_categories):
                remained_day_offs = find(lambda x: x.id == target_sign, day_off_work_categories).day_offs - i + 1
                return remained_day_offs, True
        return 0, False

    def _generate_base_pool(self, operator):
        remained_holiday_count = self._monthly_setting.holidays

        remained_day_offs, is_day_off = self._calc_residue_last_month(operator)
        remained_holiday_count -= 1 if is_day_off else 0
        base_pool = [holiday_sign]*remained_holiday_count

        request_days = [i for i, x in enumerate(self._daily_requests) if operator in x]
        requests_len = len(request_days)
        if remained_holiday_count < requests_len:
            base_pool += [n_day_sign]*(requests_len-remained_holiday_count)

        requests_bunch_len = len([i for i, x in enumerate(request_days) if i == 0
                                  or i + 1 < len(request_days) and x + 1 != request_days[i + 1]])

        work_day_len = len(self._monthly_setting.days)-len(base_pool)
        holiday_bunch_len = len(base_pool)-requests_len+requests_bunch_len
        require_holiday_bunch_len = math.ceil(work_day_len / 5)
        base_pool += [n_day_sign]*max(require_holiday_bunch_len-holiday_bunch_len, 0)

        fixed_schedules_len = len(list(filter(lambda x: operator in x, self._daily_fixed_schedules)))
        base_pool += [fixed_schedule_day_sign]*fixed_schedules_len

        if len(base_pool) > len(self._monthly_setting.days):
            raise Exception('{} is excess request'.format(operator.user.name))
        base_pool += [work_day_sign]*(len(self._monthly_setting.days)-len(base_pool)-remained_day_offs)
        return base_pool
    
    def _batch_genetic_wrapper(self, operator):
        base_pool = self._generate_base_pool(operator)
        with Pool(multi.cpu_count()) as p:
            batch = p.map(self._genetic_wrapper, [(operator, base_pool) for _ in range(1000)])
        remained_day_off, is_day_off = self._calc_residue_last_month(operator)
        return [[day_off_sign]*remained_day_off + [holiday_sign]*(1 if is_day_off else 0)
                + self._translate_as_gene(x.gene, base_pool) for x in batch]
    
    def run(self):
        common_gene = None
        compatibles = []
        print("""====================
## start outlines building""")
        for operator in self._operators:
            if self._need_unique_schedule(operator):
                compatibles.append(self._batch_genetic_wrapper(operator))
            else:
                if not common_gene:
                    common_gene = self._batch_genetic_wrapper(operator)
                compatibles.append([x[:] for x in common_gene])
        print("""## finished
====================""")
        return compatibles
