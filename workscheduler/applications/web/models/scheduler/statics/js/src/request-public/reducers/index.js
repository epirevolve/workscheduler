import { combineReducers } from 'redux';
import requestDialog from './request-dialog';
import requestCalendar from './request-calendar';

export default combineReducers({
    requestDialog,
    requestCalendar
})