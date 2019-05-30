import { combineReducers } from 'redux';
import monthlySetting from './monthly-setting';
import ui from './ui';

export default combineReducers({
    monthlySetting,
    ui
})