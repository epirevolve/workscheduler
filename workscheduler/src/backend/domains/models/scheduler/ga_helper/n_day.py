# -*- coding: utf-8 -*-

"""Contains helper, and evaluation class witch adjust n day in schedule."""
from statistics import stdev
from statistics import mean

from logging import getLogger

from eart import Genetic

from domains.models.scheduler.ga_helper.ga_helper import build_parent_selection
from domains.models.scheduler.ga_helper.ga_helper import build_survivor_selection
from .monthly import SchedulerMonthlyHelperBase
from .signs import n_day_sign

_logger = getLogger(__name__)


class SchedulerNDayHelper(SchedulerMonthlyHelperBase):
    
    def __init__(self, monthly_setting, operators, schedules):
        super(SchedulerNDayHelper, self).__init__(monthly_setting, operators)
        self._operators = operators
        self._schedules = schedules
    
    def _gene_to_schedule(self, gene):
        return [self._schedules[i][x] for i, x in enumerate(gene)]
    
    @staticmethod
    def _evaluate_by_n_day_std(schedules, weight):
        n_days = [sum([1 for y in x if y == 'N']) for x in schedules]
        return weight - min(weight, stdev(n_days)/(mean(n_days) or 1))
    
    def _evaluate(self, gene):
        schedules = self._gene_to_schedule(gene)
        adaptability = 0
        adaptability += self._evaluate_by_require(schedules, 5)
        adaptability += self._evaluate_by_essential_skill(schedules, 4)
        adaptability += self._evaluate_by_work_hours_std(schedules, 2)
        adaptability += self._evaluate_by_skill_std(schedules, 3)
        adaptability += self._evaluate_by_n_day_std(schedules, 2)
        return adaptability
    
    def run(self, *, logger=_logger):
        logger.info("""====================
## start n day adjusting""")
        genetic = Genetic(evaluation=self._evaluate, base_kind=['', n_day_sign],
                          gene_size=len(self._schedules)*len(self._schedules[0][1]),
                          generation_size=1000, population_size=1000, saturated_limit=20)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation()
        genetic.crossover = build_crossover()
        genetic.compile()
        ret = genetic.run()
        logger.info("""## finished
====================""")
        return [(self._operators[i], x) for i, x in enumerate(self._gene_to_schedule(ret.gene))]
