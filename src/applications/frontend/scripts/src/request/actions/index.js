import moment from 'moment';

import * as actionTypes from '../actionTypes';

import { getUuid } from 'commonApi';

export const startFetchMonthlySetting = (team, scheduleOf) => ({
    type: actionTypes.START_FETCH_MONTHLY_SETTING,
    payload: { team, scheduleOf }
});

export const successFetchMonthlySetting = (monthlySetting) => ({
    type: actionTypes.SUCCESS_FETCH_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const failureFetchMonthlySetting = () => ({
    type: actionTypes.FAILURE_FETCH_MONTHLY_SETTING,
    payload: { message: '' }
});

export const startUpdateMonthlySetting = (monthlySetting) => ({
    type: actionTypes.START_UPDATE_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const successUpdateMonthlySetting = (monthlySetting) => ({
    type: actionTypes.SUCCESS_UPDATE_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const failureUpdateMonthlySetting = () => ({
    type: actionTypes.FAILURE_UPDATE_MONTHLY_SETTING,
});

export const startRemoveRequest = (id) => ({
    type: actionTypes.START_REMOVE_REQUEST,
    payload: { id }
});

export const successRemoveRequest = (id) => ({
    type: actionTypes.SUCCESS_REMOVE_REQUEST,
    payload: { id }
});

export const failureRemoveRequest = () => ({
    type: actionTypes.FAILURE_REMOVE_REQUEST,
});

export const openDialogToAppend = async (currentDate) => {
    const uuid = await getUuid();
    return {
        type: actionTypes.OPEN_DIALOG_APPEND,
        payload: {
            uuid,
            atFrom: moment(`${currentDate.toDateFormatString()} 09:30`, 'YYYY-MM-DD HH:mm'),
            atTo: moment(`${currentDate.toDateFormatString()} 18:00`, 'YYYY-MM-DD HH:mm')
        }
    }; 
};

export const openDialogToUpdate = (request) => ({
    type: actionTypes.OPEN_DIALOG_UPDATE,
    payload: { request }
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const changeTitle = (text) => ({
    type: actionTypes.CHANGE_TITLE,
    payload: { text }
});

export const changeNote = (text) => ({
    type: actionTypes.CHANGE_NOTE,
    payload: { text }
});

export const changeDate = ([ atFrom, atTo ]) => ({
    type: actionTypes.CHANGE_DATE,
    payload: { atFrom, atTo }
});