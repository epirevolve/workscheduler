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

from logging import getLogger

_logger = getLogger(__name__)

not_assigned_sign = 'ziuf7a9s8rhwrjkha86s87'


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

        self._amplified = 1000

    @staticmethod
    def _evaluate_by_continuous_attendance(gene, weight):
        ratio = weight / len(gene)
        continuous_attendance = [(y, len([_ for _ in z])) for y, z in
                                 groupby(gene, key=lambda x: x in [holiday_sign, n_day_sign])]
        adaptability = sum([ratio * y for x, y in continuous_attendance if y > 5 and not x])
        adaptability += sum([ratio * y for x, y in continuous_attendance[1:-1] if y < 2 and not x])
        return weight - min(weight, adaptability)
    
    @staticmethod
    def _evaluate_by_holiday_continuity(gene, weight):
        continuous_holiday = [sum(1 for _ in z) for y, z in
                              groupby(gene, key=lambda x: x in [holiday_sign, n_day_sign]) if y]
        ratio = weight / (sum(continuous_holiday) or 1)
        adaptability = ratio * len([x for x in continuous_holiday if x > 2])
        if 2 not in continuous_holiday:
            adaptability += ratio * 5
        return weight - min(weight, adaptability)
    
    @staticmethod
    def _translate_as_gene(indices, base_pool, template):
        template = template[:]
        indices = indices[:]
        while len(indices) > 0:
            index = indices.pop()
            template[template.index(not_assigned_sign)] = base_pool[index]
        return template

    def _evaluate(self,  base_pool, template):
        def _fnc(loci):
            adaptability = 3
            gene = self._translate_as_gene(loci, base_pool, template)
            adaptability += self._evaluate_by_continuous_attendance(gene, 4)
            adaptability += self._evaluate_by_holiday_continuity(gene, 3)
            return adaptability
        return _fnc

    def _genetic_wrapper(self, args):
        base_pool, template = args
        genetic = Genetic(evaluation=self._evaluate(base_pool, template),
                          base_kind=range(len(base_pool)), homo_progeny_restriction=True,
                          saturated_limit=60, generation_size=1000, population_size=500)
        genetic.parent_selection = build_parent_selection()
        genetic.survivor_selection = build_survivor_selection(genetic.population_size)
        genetic.mutation = build_mutation_unique()
        genetic.crossover = build_crossover_unique()
        genetic.compile()
        return genetic.run()

    def _calc_remained_day_off(self, operator):
        if not self._last_month_schedules:
            return 0, False
        last_schedules = list(filter(lambda x: x.operator == operator, self._last_month_schedules.components))
        if not last_schedules:
            return 0, False
        last_schedules = last_schedules[0]
        day_off_work_categories = list(filter(lambda x: x.day_offs > 0, self._work_categories))
        target_sign = last_schedules.day_work_categories[-1].work_category_id
        if target_sign != day_off_sign and target_sign not in map(lambda x: x.id, day_off_work_categories):
            return 0, False

        for i in range(1, len(self._monthly_setting.days)-1):
            target_sign = last_schedules.day_work_categories[-i].work_category_id
            if target_sign in map(lambda x: x.id, day_off_work_categories):
                remained_day_offs = find(lambda x: x.id == target_sign, day_off_work_categories).day_offs - i + 1
                return remained_day_offs, True
        return 0, False

    def _replace_with_day_offs(self, template, operator):
        remained_day_offs, is_day_off = self._calc_remained_day_off(operator)
        if not is_day_off:
            return template
        for i in range(remained_day_offs):
            template[i] = day_off_sign
        template[remained_day_offs] = holiday_sign
        return template

    def _get_schedule(self, day_index, category, operator):
        if category != not_assigned_sign:
            return category
        if operator in self._daily_requests[day_index]:
            return holiday_sign
        if operator in self._daily_fixed_schedules[day_index]:
            return fixed_schedule_day_sign
        return not_assigned_sign

    def _replace_with_n_day(self, template):
        holiday_count = sum([1 for x in template if x == holiday_sign])
        if holiday_count <= self._monthly_setting.holidays:
            return template
        for _ in range(holiday_count - self._monthly_setting.holidays):
            template[template.index(holiday_sign)] = n_day_sign
        return template

    def _get_week_day_schedule(self, day_index, category):
        if category != not_assigned_sign:
            return category
        return work_day_sign if not self._monthly_setting.days[day_index].is_holiday else holiday_sign

    def _get_template(self, operator):
        template = [not_assigned_sign for _ in range(len(self._monthly_setting.days))]
        template = self._replace_with_day_offs(template, operator)
        template = [self._get_schedule(i, x, operator) for i, x in enumerate(template)]
        if operator in set([y for x in self._work_categories for y in x.week_day_operators]):
            template = [self._get_week_day_schedule(i, x) for i, x in enumerate(template)]
        template = self._replace_with_n_day(template)
        return template

    def _generate_base_pool(self, operator, template):
        remained_holiday_count = self._monthly_setting.holidays - len([x for x in template if x == holiday_sign])
        base_pool = [holiday_sign]*max(remained_holiday_count, 0)

        request_days = [i for i, x in enumerate(self._daily_requests) if operator in x]
        requests_len = len(request_days)
        requests_bunch_len = len([i for i, x in enumerate(request_days) if i == 0
                                  or i + 1 < len(request_days) and x + 1 != request_days[i + 1]])

        work_day_len = len([x for x in template if x in [work_day_sign, fixed_schedule_day_sign, not_assigned_sign]]) \
            - len(base_pool)
        holiday_bunch_len = len([x for x in template if x == holiday_sign])+len(base_pool) \
            - requests_len+requests_bunch_len
        require_holiday_bunch_len = math.ceil(work_day_len / 5)
        base_pool += [n_day_sign]*max(require_holiday_bunch_len-holiday_bunch_len, 0)

        if len(base_pool) > len(self._monthly_setting.days):
            raise Exception('{} is excess request'.format(operator.user.name))
        base_pool += [work_day_sign]*(work_day_len-len([x for x in template if x == fixed_schedule_day_sign]))

        if len(base_pool) != len([x for x in template if x == not_assigned_sign]):
            raise Exception()
        return base_pool
    
    def _batch_genetic_wrapper(self, operator, template):
        base_pool = self._generate_base_pool(operator, template)
        with Pool(multi.cpu_count()) as p:
            batch = p.map(self._genetic_wrapper, [(base_pool, template) for _ in range(self._amplified)])
        return [self._translate_as_gene(x.gene, base_pool, template) for x in batch]
    
    def run(self, *, logger=_logger):
        stocks = {}
        compatibles = []
        logger.info("""====================
## start outlines building""")
        for operator in self._operators:
            template = self._get_template(operator)
            template_key = str.join('', template)
            if template_key not in stocks:
                if len([x for x in template if x == not_assigned_sign]) > 0:
                    ret = self._batch_genetic_wrapper(operator, template)
                else:
                    ret = [template[:] for _ in range(self._amplified)]
                stocks[template_key] = ret
            compatibles.append([x[:] for x in stocks.get(template_key)])
        logger.info("""## finished
====================""")
        return compatibles
