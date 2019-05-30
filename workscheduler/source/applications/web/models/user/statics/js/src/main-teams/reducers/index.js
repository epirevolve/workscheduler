import { combineReducers } from 'redux';

import mainTeamDialog from './main-team-dialog';
import mainTeams from './main-teams';

export default combineReducers({
    mainTeamDialog,
    mainTeams
})