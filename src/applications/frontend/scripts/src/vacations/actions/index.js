import * as actionTypes from '../actionTypes';

export const startFetchVacations = () => ({
    type: actionTypes.START_FETCH_VACATIONS,
});

export const successFetchVacations = (vacations) => ({
    type: actionTypes.SUCCESS_FETCH_VACATIONS,
    payload: { vacations }
});

export const failureFetchVacations = () => ({
    type: actionTypes.FAILURE_FETCH_VACATIONS,
});

export const startAppendVacation = (vacation) => ({
    type: actionTypes.START_APPEND_VACATION,
    payload: { vacation }
});

export const successAppendVacation = (vacation) => ({
    type: actionTypes.SUCCESS_APPEND_VACATION,
    payload: { vacation }
});

export const failureAppendVacation = () => ({
    type: actionTypes.FAILURE_APPEND_VACATION,
});

export const startUpdateVacation = (vacation) => ({
    type: actionTypes.START_UPDATE_VACATION,
    payload: { vacation }
});

export const successUpdateVacation = (vacation) => ({
    type: actionTypes.SUCCESS_UPDATE_VACATION,
    payload: { vacation }
});

export const failureUpdateVacation = () => ({
    type: actionTypes.FAILURE_UPDATE_VACATION,
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