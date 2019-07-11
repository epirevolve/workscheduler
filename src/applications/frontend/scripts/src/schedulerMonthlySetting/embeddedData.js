const dataset = document.querySelector('script[src*="schedulerMonthly"]').dataset;

export const team = JSON.parse(dataset.team);
export const operators = JSON.parse(dataset.operators);