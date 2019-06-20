import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import schedules from './schedules';
import teams from './teams';
import ui from './ui';

const dataset = document.querySelector('script[id="base-schedule"]').dataset;
import { initValue as schedulesInitValue } from '../../schedule/reducers';
export const initValue = {
    schedules: schedulesInitValue,
    teams: {team: JSON.parse(dataset.team)},
    ui: {isLoading: true, isProgressing: false}
};

export default combineWithCommonReducer({schedules, teams, ui, snackbar});