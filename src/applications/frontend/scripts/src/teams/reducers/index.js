import { reducerWrapper } from 'commonReducer';

import teams from './teams';
import teamDialog from './team-dialog';
import ui from './ui';

import { teams as teamsInitValue } from "../embeddedData";

export const initValue = ({
    teams: teamsInitValue,
    teamDialog: {},
    ui: { dialogOpen: false }
});

export default reducerWrapper({ teams, teamDialog, ui });