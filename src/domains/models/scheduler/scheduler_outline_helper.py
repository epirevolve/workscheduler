# -*- coding: utf-8 -*-

"""Contains helper class which make outline of schedule."""
from itertools import groupby
from itertools import chain
import math
from multiprocessing import Pool
import multiprocessing as multi

from eart import Genetic

from .ga_helper import build_parent_selection
from .ga_helper import build_survivor_selection
from .ga_helper import build_mutation_unique
from .ga_helper import build_crossover_unique

from .scheduler_n_day_helper import n_day_sign


work_day_sign = "A"
fixed_schedule_day_sign = "B"
holiday_sign = " "


class SchedulerOutlineHelper:
    """Helper class for individual schedule outlines.
    
    This helper create a work scheduling which make daily schedule like work, holiday,
    or fixed schedule like training by ga. Daily schedule properlity is evaluated
    by number of holiday, continuity of work day, adoption rate of operator request,
    and save a day for fixed schedule.
    
    """
    
    def __init__(self, work_categories, monthly_setting, operators):
        """Prepare to run a scheduling.
        
        Obtain daily requests and daily fixed schedules from monthly setting and make a bit of change.
        Daily requests are changed into request operator's id list and daily fixed schedule
        are changed into participant's id list.
        
        Args:
            monthly_setting (MonthlySetting): monthly setting of target year and month.
            operators (list of Operator): active operators of making work schedule.
        
        """
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

    def _gene_to_codon(self, gene):
        return [self.codon_[i] for i in gene]

    def _evaluate(self, operator):
        def _fnc(gene):
            adaptability = 3
            codon = self._gene_to_codon(gene)
            adaptability += self._evaluate_by_continuous_attendance(codon, 4)
            adaptability += self._evaluate_by_holiday_continuity(codon, 3)
            adaptability += self._evaluate_by_week_day_operator(codon, operator, 10)
            adaptability *= self._evaluate_by_request(codon, operator)
            adaptability *= self._evaluate_by_fixed_schedule(codon, operator)
            return adaptability
        return _fnc

    def _need_unique_schedule(self, operator):
        return operator in set([y for x in self._daily_requests for y in x])\
               or operator in set([y for x in self._daily_fixed_schedules for y in x])\
               or operator in set([y for x in self._work_categories for y in x.week_day_operators])

    def _genetic_wrapper(self, operator):
        genetic = Genetic(evaluation=self._evaluate(operator),
                          base_kind=range(len(self._monthly_setting.days)), homo_progeny_restriction=True,
                          saturated_limit=60, generation_size=1000, population_size=500)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation_unique()
        genetic.crossover = build_crossover_unique()
        genetic.compile()
        return genetic.run()
    
    def _set_codon(self, operator):
        request_days = [i for i, x in enumerate(self._daily_requests) if operator in x]
        requests_len = len(request_days)
        self.codon_ = [holiday_sign]*self._monthly_setting.holidays
        if self._monthly_setting.holidays < requests_len:
            self.codon_ += [n_day_sign]*(requests_len-self._monthly_setting.holidays)

        requests_bunch_len = len([i for i, x in enumerate(request_days) if i == 0
                                  or i + 1 < len(request_days) and x + 1 != request_days[i + 1]])

        work_day_len = len(self._monthly_setting.days)-len(self.codon_)
        holiday_bunch_len = len(self.codon_)-requests_len+requests_bunch_len
        require_holiday_bunch_len = math.ceil(work_day_len / 5)
        self.codon_ += [n_day_sign]*max(require_holiday_bunch_len-holiday_bunch_len, 0)

        fixed_schedules_len = len(list(filter(lambda x: operator in x, self._daily_fixed_schedules)))
        self.codon_ += [fixed_schedule_day_sign]*fixed_schedules_len

        if len(self.codon_) > len(self._monthly_setting.days):
            raise Exception('{} is excess request'.format(operator.user.name))
        self.codon_ += [work_day_sign]*(len(self._monthly_setting.days)-len(self.codon_))
    
    def _batch_genetic_wrapper(self, operator):
        self._set_codon(operator)
        with Pool(multi.cpu_count()) as p:
            batch = p.map(self._genetic_wrapper, [operator for _ in range(1000)])
        return [self._gene_to_codon(x.gene) for x in batch]
    
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
