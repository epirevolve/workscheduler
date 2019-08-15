import * as actionTypes from '../actionTypes';

import { getUuid } from 'commonApi';

export const changeRequire = (day, categoryId, require) => ({
    type: actionTypes.CHANGE_REQUIRE,
    payload: { day, categoryId, require }
});

export const changeIsHoliday = (day, isHoliday) => ({
    type: actionTypes.CHANGE_IS_HOLIDAY,
    payload: { day, isHoliday }
});

export const changeMonthlyHoliday = (count) => ({
    type: actionTypes.CHANGE_MONTHLY_HOLIDAY,
    payload: { count }
});

export const changeTitle = (title) => ({
    type: actionTypes.CHANGE_TITLE,
    payload: { title }
});

export const changeDate = (date) => ({
    type: actionTypes.CHANGE_DATE,
    payload: { onFrom: date[0], onTo: date[1] }
});

export const changeAtFrom = (atFrom) => ({
    type: actionTypes.CHANGE_AT_FROM,
    payload: { atFrom }
});

export const changeAtTo = (atTo) => ({
    type: actionTypes.CHANGE_AT_TO,
    payload: { atTo }
});

export const changeParticipant = (participant) => ({
    type: actionTypes.CHANGE_PARTICIPANT,
    payload: { participant }
});

export const openDialogToAppend = async (scheduleOf) => {
    const uuid = await getUuid();
    return {
        type: actionTypes.OPEN_DIALOG_APPEND,
        payload: { uuid, scheduleOf }
    };
};

export const openDialogToUpdate = (fixedSchedule) => ({
    type: actionTypes.OPEN_DIALOG_UPDATE,
    payload: { fixedSchedule }
});

export const closeDialog = () => ({
    type: actionTypes.CLOSE_DIALOG
});

export const appendFixedSchedule = (fixedSchedule) => ({
    type: actionTypes.APPEND_FIXED_SCHEDULE,
    payload: { fixedSchedule }
});

export const updateFixedSchedule = (fixedSchedule) => ({
    type: actionTypes.UPDATE_FIXED_SCHEDULE,
    payload: { fixedSchedule }
});

export const removeFixedSchedule = (id) => ({
    type: actionTypes.REMOVE_FIXED_SCHEDULE,
    payload: { id }
});