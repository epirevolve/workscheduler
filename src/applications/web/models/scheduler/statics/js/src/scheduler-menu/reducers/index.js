import { combineReducers } from 'redux';
import menu from './menu';
import snackbar from 'snackbarReducers';

export default combineReducers({
    menu,
    snackbar
});