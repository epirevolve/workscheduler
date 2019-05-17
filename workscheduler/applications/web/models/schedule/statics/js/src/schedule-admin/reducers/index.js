import { combineReducers } from 'redux';

import affiliations from './affiliations';
import schedules from '../../schedule/reducers/schedules';

const dataset = document.querySelector('script[id="base-schedule"]').dataset;

export const initValue = {
    affiliation: JSON.parse(dataset.affiliation)}


export default combineReducers({
    schedules,
    affiliations
})