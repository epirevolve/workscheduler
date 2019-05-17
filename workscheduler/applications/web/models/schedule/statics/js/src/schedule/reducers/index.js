import { combineReducers } from 'redux';

import schedules from './schedules';

export const initValue = {
    daySettings: [],
    schedules: [],
    totals: [],
    scheduleOf: new Date().toYearMonthFormatString()}

export default combineReducers({
    schedules
})