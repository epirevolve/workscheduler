import { combineWithCommonReducer } from 'wrappingByCommonReducer';

import teams from './teams';
import teamDialog from './team-dialog';
import ui from './ui';

const dataset = document.querySelector('script[src*="teams"]').dataset;
export const initValue = ({
    teams: JSON.parse(dataset.teams),
    teamDialog: {},
    ui: { dialogOpen: false }
});

export default combineWithCommonReducer({ teams, teamDialog, ui });