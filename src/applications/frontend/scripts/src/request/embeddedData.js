const dataset = document.querySelector('script[src*="request"]').dataset;

export const holidays = JSON.parse(dataset.holidays);
export const paidHolidays = JSON.parse(dataset.paidHolidays || 0);

const d = new Date();
const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
const minDate = new Date(today.addMonths(1).setDate(1));
minDate.setHours(0);
minDate.setMinutes(0);
minDate.setSeconds(0);
minDate.setMilliseconds(0);
const maxDate = new Date(today.addMonths(7).setDate(0));
maxDate.setHours(23);
maxDate.setMinutes(59);
maxDate.setSeconds(59);
maxDate.setMilliseconds(99);
