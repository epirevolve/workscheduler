import { combineReducers } from 'redux';

import teamDialog from './team-dialog';
import teams from './teams';

export default combineReducers({
    teamDialog,
    teams
});