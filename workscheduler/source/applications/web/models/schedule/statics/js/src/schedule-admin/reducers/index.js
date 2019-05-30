import { combineReducers } from 'redux';

import schedules from '../../schedule/reducers/schedules';
import affiliations from './affiliations';
import ui from '../../schedule/reducers/ui';

const dataset = document.querySelector('script[id="base-schedule"]').dataset;

export const initValue = {
    affiliation: JSON.parse(dataset.affiliation)
}

export default combineReducers({
    schedules, affiliations, ui
})