import { combineReducers } from 'redux';

import snackbar from 'snackbarReducers';

export const combineWithCommonReducer = (other) => {
    return combineReducers({snackbar, ...other});
};