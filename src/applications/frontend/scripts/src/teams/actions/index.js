import * as actionTypes from '../actionTypes';

export const startAppendTeam = (team) => ({
    type: actionTypes.START_APPEND_TEAM,
    payload: { team }
});

export const successAppendTeam = (team) => ({
    type: actionTypes.SUCCESS_APPEND_TEAM,
    payload: { team }
});

export const failureAppendTeam = () => ({
    type: actionTypes.FAILURE_APPEND_TEAM,
});

export const startUpdateTeam = (team) => ({
    type: actionTypes.START_UPDATE_TEAM,
    payload: { team }
});

export const successUpdateTeam = (team) => ({
    type: actionTypes.SUCCESS_UPDATE_TEAM,
    payload: { team }
});

export const failureUpdateTeam = () => ({
    type: actionTypes.FAILURE_UPDATE_TEAM,
});

export const startRemoveTeam = (id) => ({
    type: actionTypes.START_REMOVE_TEAM,
    payload: { id }
});

export const successRemoveTeam = (id) => ({
    type: actionTypes.SUCCESS_REMOVE_TEAM,
    payload: { id }
});

export const failureRemoveTeam = () => ({
    type: actionTypes.FAILURE_REMOVE_TEAM
});

export const openDialogToAppend = () => ({
    type: actionTypes.OPEN_DIALOG_APPEND
});

export const openDialogToUpdate = (team) => ({
    type: actionTypes.OPEN_DIALOG_UPDATE,
    payload: { team }
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const changeName = (text) => ({
    type: actionTypes.CHANGE_NAME,
    payload: { text }
});

export const changeNote = (text) => ({
    type: actionTypes.CHANGE_NOTE,
    payload: { text }
});