import moment from 'moment';
import * as actionTypes from '../actionTypes';

export const startFetchCalendar = (team, scheduleOf) => ({
    type: actionTypes.START_FETCH_CALENDAR,
    payload: { team, scheduleOf }
});

export const successFetchCalendar = (calendar) => ({
    type: actionTypes.SUCCESS_FETCH_CALENDAR,
    payload: { calendar }
});

export const failureFetchCalendar = () => ({
    type: actionTypes.FAILURE_FETCH_CALENDAR,
    payload: { message: '' }
});

export const startAppendRequest = (request) => ({
    type: actionTypes.START_APPEND_REQUEST,
    payload: { request }
});

export const successAppendRequest = (request) => ({
    type: actionTypes.SUCCESS_APPEND_REQUEST,
    payload: { request }
});

export const failureAppendRequest = () => ({
    type: actionTypes.FAILURE_APPEND_REQUEST,
});

export const startUpdateRequest = (request) => ({
    type: actionTypes.START_APPEND_REQUEST,
    payload: { request }
});

export const successUpdateRequest = (request) => ({
    type: actionTypes.SUCCESS_UPDATE_REQUEST,
    payload: { request }
});

export const failureUpdateRequest = () => ({
    type: actionTypes.FAILURE_UPDATE_REQUEST,
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

export const openDialogToAppend = (atFrom, atTo) => ({
    type: actionTypes.OPEN_DIALOG_APPEND,
    payload: { atFrom: moment(atFrom), atTo: moment(atTo) }
});

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