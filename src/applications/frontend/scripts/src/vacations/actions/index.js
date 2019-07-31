import * as actionTypes from '../actionTypes';

export const startFetchScheduler = () => ({
    type: actionTypes.START_FETCH_SCHEDULER,
});

export const successFetchScheduler = (scheduler) => ({
    type: actionTypes.SUCCESS_FETCH_SCHEDULER,
    payload: { scheduler }
});

export const failureFetchScheduler = () => ({
    type: actionTypes.FAILURE_FETCH_SCHEDULER,
});

export const startUpdateScheduler = (scheduler) => ({
    type: actionTypes.START_UPDATE_SCHEDULER,
    payload: { scheduler }
});

export const successUpdateScheduler = (vacation) => ({
    type: actionTypes.SUCCESS_UPDATE_SCHEDULER,
    payload: { vacation }
});

export const failureUpdateScheduler = () => ({
    type: actionTypes.FAILURE_UPDATE_SCHEDULER,
});

export const startRemoveVacation = (id) => ({
    type: actionTypes.START_REMOVE_VACATION,
    payload: { id }
});

export const successRemoveVacation = (id) => ({
    type: actionTypes.SUCCESS_REMOVE_VACATION,
    payload: { id }
});

export const failureRemoveVacation = () => ({
    type: actionTypes.FAILURE_REMOVE_VACATION
});

export const openDialogToAppend = () => ({
    type: actionTypes.OPEN_DIALOG_APPEND
});

export const openDialogToUpdate = (vacation) => ({
    type: actionTypes.OPEN_DIALOG_UPDATE,
    payload: { vacation }
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const changeTitle = (text) => ({
    type: actionTypes.CHANGE_TITLE,
    payload: { text }
});

export const changeDaysCount = (count) => ({
    type: actionTypes.CHANGE_DAYS_COUNT,
    payload: { count }
});

export const changeStartFrom = (date) => ({
    type: actionTypes.CHANGE_START_FROM,
    payload: { date }
});

export const changeEndOn = (date) => ({
    type: actionTypes.CHANGE_END_ON,
    payload: { date }
});