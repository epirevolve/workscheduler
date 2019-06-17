import { combineReducers } from 'redux';

import schedules from './schedules';
import teams from './teams';
import ui from './ui';
import snackbar from 'snackbarReducers';

const dataset = document.querySelector('script[id="base-schedule"]').dataset;

export const initValue = {
    team: JSON.parse(dataset.team)
};

export default combineReducers({
    schedules, teams, ui, snackbar
});