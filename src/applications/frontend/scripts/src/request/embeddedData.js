const dataset = document.querySelector('script[src*="request"]').dataset;

export const holidays = JSON.parse(dataset.holidays);
export const paidHolidays = JSON.parse(dataset.paidHolidays || 0);