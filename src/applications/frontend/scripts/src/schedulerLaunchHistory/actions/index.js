import * as actionTypes from '../actionTypes';

export const startFetchCurrentRunners = () => ({
    type: actionTypes.START_FETCH_RUNNERS,
    payload: {}
});

export const successFetchCurrentRunners = (currentRunners) => ({
    type: actionTypes.SUCCESS_FETCH_RUNNERS,
    payload: {currentRunners}
});

export const failureFetchCurrentRunners = () => ({
    type: actionTypes.FAILURE_FETCH_RUNNERS,
    payload: {}
});

export const startFetchLaunchHistories = () => ({
    type: actionTypes.START_FETCH_LAUNCH_HISTORIES,
    payload: {}
});

export const successFetchLaunchHistories = (launchHistories) => ({
    type: actionTypes.SUCCESS_FETCH_LAUNCH_HISTORIES,
    payload: {launchHistories}
});

export const failureFetchLaunchHistories = () => ({
    type: actionTypes.FAILURE_FETCH_LAUNCH_HISTORIES,
    payload: {}
});

export const startTerminateScheduler = (team) => ({
    type: actionTypes.START_TERMINATE_SCHEDULER,
    payload: {team}
});

export const successTerminateScheduler = () => ({
    type: actionTypes.SUCCESS_TERMINATE_SCHEDULER,
    payload: {}
});

export const failureTerminateScheduler = () => ({
    type: actionTypes.FAILURE_TERMINATE_SCHEDULER,
    payload: {}
});