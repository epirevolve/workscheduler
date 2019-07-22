const dataset = document.querySelector('script[src*="user"]').dataset;

export const user = JSON.parse(dataset.user);