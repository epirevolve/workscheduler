import * as actionTypes from '../actionTypes';

export const changeTeam = (team) => ({
    type: 'CHANGE_TEAM',
    team
});

export const startLaunchScheduler = (team, month, year) => ({
    type: actionTypes.START_LAUNCH_SCHEDULER,
    payload: {team, month, year}
});