import { combineReducers } from 'redux';

import schedules from '../../schedule/reducers/schedules';
import teams from './teams';
import ui from '../../schedule/reducers/ui';

const dataset = document.querySelector('script[id="base-schedule"]').dataset;

export const initValue = {
    team: JSON.parse(dataset.team)
};

export default combineReducers({
    schedules, teams, ui
});