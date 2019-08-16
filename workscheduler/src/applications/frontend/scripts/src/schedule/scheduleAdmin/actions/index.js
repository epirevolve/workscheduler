import * as actionTypes from '../actionTypes';

export const changeTeam = (team) => ({
    type: actionTypes.CHANGE_TEAM,
    payload: { team }
});

export const changeWorkCategory = (operator, day, daySetting, category, workCategories) => ({
    type: actionTypes.CHANGE_WORK_CATEGORY,
    payload: {
        operator,
        day,
        daySetting,
        category,
        workCategories
    }
});

export const startSaveSchedules = (schedules) => ({
    type: actionTypes.START_SAVE_SCHEDULES,
    payload: { schedules }
});

export const successSaveSchedules = () => ({
    type: actionTypes.SUCCESS_SAVE_SCHEDULES,
    payload: { message: '' }
});

export const failureSaveSchedules = () => ({
    type: actionTypes.FAILURE_SAVE_SCHEDULES,
    payload: { message: '' }
});

export const startPublishSchedules = (schedules) => ({
    type: actionTypes.START_PUBLISH_SCHEDULES,
    payload: { schedules }
});

export const successPublishSchedules = () => ({
    type: actionTypes.SUCCESS_PUBLISH_SCHEDULES,
    payload: { message: '' }
});

export const failurePublishSchedules = () => ({
    type: actionTypes.FAILURE_PUBLISH_SCHEDULES,
    payload: { message: '' }
});

export const startWithdrawSchedules = (schedules) => ({
    type: actionTypes.START_WITHDRAW_SCHEDULES,
    payload: { schedules }
});

export const successWithdrawSchedules = () => ({
    type: actionTypes.SUCCESS_WITHDRAW_SCHEDULES,
    payload: { message: '' }
});

export const failureWithdrawSchedules = () => ({
    type: actionTypes.FAILURE_WITHDRAW_SCHEDULES,
    payload: { message: '' }
});