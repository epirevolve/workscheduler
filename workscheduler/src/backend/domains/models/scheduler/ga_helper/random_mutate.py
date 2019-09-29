# -*- coding: utf-8 -*-

import math

import numpy as np

from logging import getLogger

from eart.indivisual import Individual

from .monthly import SchedulerMonthlyHelperBase

_logger = getLogger(__name__)


class SchedulerMonthlyRandomMutateHelper(SchedulerMonthlyHelperBase):

    def __init__(self, monthly_setting, operators, schedules):
        super(SchedulerMonthlyRandomMutateHelper, self).__init__(monthly_setting, operators)
        self._operators = operators
        self._schedules = schedules
        self._base = range(len(self._schedules[0]))
        self._era = 1
        self._max_perturbation_rate = 33
        self._saturate_limit = 50000

    def _gene_to_schedule(self, gene):
        return [self._schedules[i][x] for i, x in enumerate(gene)]

    def _is_terminate(self, adapters):
        if not adapters:
            return False
        return self._era > self._saturate_limit \
            and len(set(map(lambda x: x.adaptability, adapters[-self._saturate_limit:]))) == 1

    def _perturb_genes(self, individual):
        percentage = abs(self._max_perturbation_rate - (individual.adaptability / 10 * 100 / 3))
        count = math.ceil(percentage / 100 * len(individual.gene))
        indices = np.random.choice(range(len(individual.gene)), count)
        gene = individual.gene[:]
        for index in indices:
            gene[index] = np.random.choice(self._base)
        return gene

    def _evaluate(self, gene):
        schedules = self._gene_to_schedule(gene)
        transpose = np.array(schedules).T
        adaptability = 0
        adaptability += self._evaluate_by_skill_std(transpose, 1)
        adaptability += self._evaluate_by_require(transpose, less_weight=5, excess_weight=2.5)
        adaptability += self._evaluate_by_require_diff_std(transpose, 1.5)
        adaptability *= self._evaluate_by_essential_skill(transpose)
        return adaptability

    def _evaluate_and_build_individual(self, gene):
        individual = Individual.new(gene, self._era)
        individual.adaptability = self._evaluate(gene)
        return individual

    def _scheduling(self, protobiont, logger):
        individuals = [protobiont]
        adapters = []
        while not self._is_terminate(adapters):
            perturbed_gene = [self._perturb_genes(x) for x in individuals]
            individuals = individuals + [self._evaluate_and_build_individual(x) for x in perturbed_gene]
            individuals = sorted(individuals, key=lambda x: x.adaptability, reverse=True)
            individuals = individuals[:3]
            adapter = individuals[0]
            adapters.append(adapter)
            self._era += 1
            if self._era % 1000 == 0:
                logger.debug("era: {}, adaptability: {}".format(self._era, adapter.adaptability))
        return adapters[-1]

    def run(self, result, *, logger=_logger):
        logger.info("""====================
        ## start monthly random schedule adjusting""")
        ret = self._scheduling(result, logger)
        adaptability = math.floor(ret.adaptability / 10 * 100)
        logger.info("### adaptability: {}".format(adaptability))
        logger.info("""## finished
        ====================""")
        return self._gene_to_schedule(ret.gene), adaptability

