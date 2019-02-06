# -*- coding: utf-8 -*-

from eart.selections import EliteSelection
from eart.selections import TournamentSelection
from eart.mutations import WholeMutation
from eart.mutations import InvertMutation
from eart.mutations import TranslocateMutation
from eart.crossovers import CircuitCrossover
from eart.crossovers import OrderlyCrossover
from eart import Genetic
from eart import MarriageSelection
from eart import TransitionSelection
from eart import Mutation
from eart import Crossover


class Scheduler:
    def __init__(self, affiliation_id, calendar_id):
        self._affiliation_id = affiliation_id
        self._calendar_id = calendar_id
    
    def _evaluate(self):
        pass
    
    @staticmethod
    def _build_marriage_selection():
        marriage_selection = MarriageSelection()
        marriage_selection.add(EliteSelection(), 0.05)
        marriage_selection.add(TournamentSelection(group_size=3))
        marriage_selection.compile()
        return marriage_selection
    
    @staticmethod
    def _build_transition_selection(population_size):
        transition_selection = TransitionSelection(const_population_size=population_size)
        transition_selection.add(EliteSelection(), 0.05)
        transition_selection.add(TournamentSelection(group_size=3))
        transition_selection.compile()
        return transition_selection
    
    @staticmethod
    def _build_mutation():
        mutation = Mutation(proliferate_mutation=True)
        mutation.add(WholeMutation(), 0.05)
        mutation.add(InvertMutation())
        mutation.add(TranslocateMutation())
        mutation.compile()
        return mutation
    
    @staticmethod
    def _build_crossover():
        crossover = Crossover()
        crossover.add(CircuitCrossover())
        crossover.add(OrderlyCrossover())
        crossover.compile()
        return crossover
    
    def run(self):
        genetic = Genetic(evaluation=self._evaluate, gene_kind='', generation_size=500)
        genetic.marriage_selection = self._build_marriage_selection()
        genetic.transition_selection = self._build_transition_selection(genetic.population_size)
        genetic.mutation = self._build_mutation()
        genetic.crossover = self._build_crossover()
        return genetic.run()
