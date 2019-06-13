import { combineReducers } from 'redux';

import schedules from './schedules';

export const initValue = {
    daySettings: [],
    schedules: [],
    scheduleOf: new Date().toYearMonthFormatString()
};

export default combineReducers({
    schedules
});