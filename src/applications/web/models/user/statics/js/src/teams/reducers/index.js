import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import teamDialog from './team-dialog';
import teams from './teams';

const dataset = document.querySelector('script[src*="teams"]').dataset;
export const initValue = ({
    teams: JSON.parse(dataset.teams),
    teamDialog: {isOpen: false}
});

export default combineWithCommonReducer({teamDialog, teams});