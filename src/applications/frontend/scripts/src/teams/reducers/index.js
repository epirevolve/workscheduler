import { reducerWrapper } from 'commonReducer';

import teams from './teams';
import teamDialog from './team-dialog';
import ui from './ui';

const dataset = document.querySelector('script[src*="teams"]').dataset;
export const initValue = ({
    teams: JSON.parse(dataset.teams),
    teamDialog: {},
    ui: { dialogOpen: false }
});

export default reducerWrapper({ teams, teamDialog, ui });