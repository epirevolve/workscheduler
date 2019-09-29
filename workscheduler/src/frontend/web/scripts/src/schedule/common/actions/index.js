import * as actionTypes from '../actionTypes';

export const startFetchSchedules = (team, scheduleOf) => ({
    type: actionTypes.REQUEST_SCHEDULES,
    payload: { team, scheduleOf }
});

export const successFetchSchedules = (payload) => ({
    type: actionTypes.SUCCESS_SCHEDULES,
    payload
});

export const failureFetchSchedules = (error) => ({
    type: actionTypes.FAILURE_SCHEDULES,
    error
});

export const changeScheduleOf = (scheduleOf) => ({
    type: actionTypes.CHANGE_SCHEDULE_OF,
    payload: { scheduleOf }
});