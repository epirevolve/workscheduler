import { combineReducers } from 'redux';

import snackbar from './snackbar';
import waiting from "./waiting";

export const reducerWrapper = (other) => combineReducers({ snackbar, waiting, ...other });