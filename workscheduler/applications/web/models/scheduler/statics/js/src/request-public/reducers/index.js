import { combineReducers } from 'redux';
import dialog from './dialog';
import calendar from './calendar';

export default combineReducers({
    dialog,
    calendar
})