# -*- coding: utf-8 -*-

"""Contains helper class which make outline of schedule."""
from itertools import groupby
from itertools import chain
from multiprocessing import Pool
import multiprocessing as multi

from eart import Genetic

from .scheduler_helper import build_parent_selection
from .scheduler_helper import build_survivor_selection
from .scheduler_helper import build_mutation
from .scheduler_helper import build_crossover


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
    
    def __init__(self, monthly_setting, operators):
        """Prepare to run a scheduling.
        
        Obtain daily requests and daily fixed schedules from monthly setting and make a bit of change.
        Daily requests are changed into request operator's id list and daily fixed schedule
        are changed into participant's id list.
        
        Args:
            monthly_setting (MonthlySetting): monthly setting of target year and month.
            operators (list of Operator): active operators of making work schedule.
        
        """
        self._monthly_setting = monthly_setting
        self._operators = operators
        self._daily_requests = [[y.operator for y in x.requests] for x in self._monthly_setting.days]
        self._daily_fixed_schedules = [list(chain.from_iterable(y.participants for y in x.fixed_schedules))
                                       for x in self._monthly_setting.days]

    def _evaluate_by_request(self, gene, operator, weight):
        ratio = weight / len(gene)
        adaptability = sum([ratio for x, y in zip(gene, self._daily_requests)
                            if operator in y and x != holiday_sign])
        return weight - adaptability
        
    def _evaluate_by_fixed_schedule(self, gene, operator, weight):
        ratio = weight / len(gene)
        adaptability = 0
        for schedule, fixed_schedule_participants in zip(gene, self._daily_fixed_schedules):
            if operator in fixed_schedule_participants and schedule != fixed_schedule_day_sign:
                adaptability += ratio
            if operator not in fixed_schedule_participants and schedule == fixed_schedule_day_sign:
                adaptability += ratio
        return weight - adaptability

    def _evaluate_by_holiday(self, gene, weight):
        ratio = weight / (self._monthly_setting.holidays or 1)
        holidays = len([x for x in gene if x == holiday_sign])
        return weight - min(weight, abs(self._monthly_setting.holidays - holidays) * ratio)

    @staticmethod
    def _evaluate_by_continuous_attendance(gene, weight):
        ratio = weight / len(gene)
        continuous_attendance = [sum(1 for _ in z)
                                 for y, z in groupby(gene, key=lambda x: x == holiday_sign) if not y]
        adaptability = sum([ratio * x for x in continuous_attendance if x > 5 or x < 3])
        return weight - min(weight, adaptability)
    
    @staticmethod
    def _evaluate_by_holiday_continuity(gene, weight):
        continuous_holiday = [sum(1 for _ in z) for y, z in groupby(gene, key=lambda x: x == holiday_sign) if y]
        ratio = weight / (sum(continuous_holiday) or 1)
        adaptability = ratio * (abs((sum(continuous_holiday) * 2 / 3) - len(continuous_holiday))
                                + len([x for x in continuous_holiday if x > 2]))
        return weight - min(weight, adaptability)
    
    def _evaluate(self, operator):
        def _fnc(gene):
            adaptability = 0
            adaptability += self._evaluate_by_request(gene, operator, 10)
            adaptability += self._evaluate_by_fixed_schedule(gene, operator, 10)
            adaptability += self._evaluate_by_holiday(gene, 5)
            adaptability += self._evaluate_by_continuous_attendance(gene, 6)
            adaptability += self._evaluate_by_holiday_continuity(gene, 3)
            return adaptability
        return _fnc
    
    def _has_request_or_fixed_schedule(self, operator):
        return operator in set([y for x in self._daily_requests for y in x])\
               or operator in set([y for x in self._daily_fixed_schedules for y in x])

    def _genetic_wrapper(self, operator):
        genetic = Genetic(evaluation=self._evaluate(operator),
                          base_kind=[work_day_sign, fixed_schedule_day_sign, holiday_sign],
                          gene_size=len(self._monthly_setting.days), homo_progeny_restriction=True,
                          saturated_limit=20, generation_size=1000, population_size=300)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation()
        genetic.crossover = build_crossover()
        genetic.compile()
        return genetic.run()
    
    def _filter_gene(self, gene, operator):
        adaptability = 0
        adaptability += self._evaluate_by_request(gene, operator, 10)
        adaptability += self._evaluate_by_fixed_schedule(gene, operator, 10)
        return adaptability == 20
    
    def _batch_genetic_wrapper(self, operator):
        batch = []
        while len(batch) <= 300:
            with Pool(multi.cpu_count()) as p:
                batch = p.map(self._genetic_wrapper, [operator for _ in range(500)])
            batch = [x for x in batch if self._filter_gene(x.gene, operator)]
        return batch
    
    def run(self):
        common_gene = None
        compatibles = []
        print("""====================
## start outlines building""")
        for operator in self._operators:
            if self._has_request_or_fixed_schedule(operator):
                compatibles.append(self._batch_genetic_wrapper(operator))
            else:
                if not common_gene:
                    common_gene = self._batch_genetic_wrapper(operator)
                compatibles.append(common_gene[:])
        print("""## finished
====================""")
        return compatibles
