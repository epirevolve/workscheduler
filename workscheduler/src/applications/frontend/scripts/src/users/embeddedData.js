const dataset = document.querySelector('script[src*="users"]').dataset;

export const users = JSON.parse(dataset.users);
export const roles = JSON.parse(dataset.roles);
export const teams = JSON.parse(dataset.teams);