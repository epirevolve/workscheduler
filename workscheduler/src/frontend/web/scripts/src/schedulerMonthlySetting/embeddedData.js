const dataset = document.querySelector('script[src*="schedulermonthly"]').dataset;

export const team = JSON.parse(dataset.team);
export const operators = JSON.parse(dataset.operators);