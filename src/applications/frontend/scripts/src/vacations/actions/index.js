import * as actionTypes from '../actionTypes';

export const changeTitle = (id, text) => ({
    type: actionTypes.CHANGE_TITLE,
    payload: { id, text }
});

export const changeStartFrom = (id, date) => ({
    type: actionTypes.CHANGE_START_FROM,
    payload: { id, date }
});

export const changeEndOn = (id, date) => ({
    type: actionTypes.CHANGE_END_ON,
    payload: { id, date }
});

export const changeDaysCount = (id, count) => ({
    type: actionTypes.CHANGE_DAYS_COUNT,
    payload: { id, count }
});

export const changeParticipantsCount = (id, count) => ({
    type: actionTypes.CHANGE_PARTICIPANTS_COUNT,
    payload: { id, count }
});

export const appendVacation = () => ({
    type: actionTypes.APPEND_VACATION
});

export const removeVacation = (id) => ({
    type: actionTypes.REMOVE_VACATION,
    payload: { id }
});