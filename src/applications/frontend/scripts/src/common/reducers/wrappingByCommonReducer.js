import { combineReducers } from 'redux';

import snackbar from './snackbar';
import waiting from "./waiting";

export const combineWithCommonReducer = (other) => combineReducers({ snackbar, waiting, ...other });