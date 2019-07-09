import { combineReducers } from 'redux';

import snackbar from 'snackbarReducer';

export const combineWithCommonReducer = (other) => combineReducers({ snackbar, ...other });