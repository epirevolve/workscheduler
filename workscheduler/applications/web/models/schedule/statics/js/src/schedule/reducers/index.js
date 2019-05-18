import { combineReducers } from 'redux';

import schedules from './schedules';

const dataset = document.querySelector('script[id="base-schedule"]').dataset;

export const initValue = {
    daySettings: [],
    schedules: [],
    totals: [],
    scheduleOf: new Date().toYearMonthFormatString(),
    affiliation: JSON.parse(dataset.affiliation)}

export default combineReducers({
    schedules
})