import * as actionTypes from '../actionTypes';

export const changeTeam = (team) => ({
    type: actionTypes.CHANGE_TEAM,
    payload: { team }
})

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

export const startPublicSchedules = (schedules) => ({
    type: actionTypes.START_PUBLIC_SCHEDULES,
    payload: { schedules }
});

export const successPublicSchedules = () => ({
	type: actionTypes.SUCCESS_PUBLIC_SCHEDULES,
	payload: { message: '' }
});

export const failurePublicSchedules = () => ({
	type: actionTypes.FAILURE_PUBLIC_SCHEDULES,
	payload: { message: '' }
});