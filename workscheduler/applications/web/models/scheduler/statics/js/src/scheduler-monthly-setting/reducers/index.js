import { combineReducers } from 'redux';
import monthlySetting from './monthly-setting';
import fixedSchedules from './fixed-schedules';

export default combineReducers({
    monthlySetting, fixedSchedules
})