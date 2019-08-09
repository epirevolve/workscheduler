const dataset = document.querySelector('script[src*="schedulerbasic"]').dataset;

export const team = JSON.parse(dataset.team);
export const operators = JSON.parse(dataset.operators);
export const skills = JSON.parse(dataset.skills);