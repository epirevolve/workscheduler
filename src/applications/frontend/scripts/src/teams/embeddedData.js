const dataset = document.querySelector('script[src*="teams"]').dataset;

export const teams = JSON.parse(dataset.teams);