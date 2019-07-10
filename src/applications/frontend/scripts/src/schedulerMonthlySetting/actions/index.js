import * as actionTypes from '../actionTypes';

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

export const openDialogToAppend = (scheduleOf) => ({
    type: actionTypes.OPEN_DIALOG_APPEND,
    payload: { scheduleOf }
});

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

export const successUpdateMonthlySetting = () => ({
    type: actionTypes.SUCCESS_UPDATE_MONTHLY_SETTING,
    payload: { message: '' }
});

export const failureUpdateMonthlySetting = () => ({
    type: actionTypes.FAILURE_UPDATE_MONTHLY_SETTING,
    payload: { message: '' }
});

export const startPublicMonthlySetting = (monthlySetting) => ({
    type: actionTypes.START_PUBLIC_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const successPublicMonthlySetting = () => ({
    type: actionTypes.SUCCESS_PUBLIC_MONTHLY_SETTING,
    payload: { message: '' }
});

export const failurePublicMonthlySetting = () => ({
    type: actionTypes.FAILURE_PUBLIC_MONTHLY_SETTING,
    payload: { message: '' }
});