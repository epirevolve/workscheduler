import requestAgent from 'superagent';

import { REQUEST_SCHEDULES, SUCCESS_SCHEDULES, FAILURE_SCHEDULES, CHANGE_SCHEDULE_OF } from '../actionTypes';

export const requestSchedules = (affiliation, scheduleOf) => ({
    type: REQUEST_SCHEDULES,
    payload: { affiliation, scheduleOf }
})

export const successSchedules = (payload) => ({
    type: SUCCESS_SCHEDULES,
    payload
})

export const failureSchedules = (error) => ({
    type: FAILURE_SCHEDULES,
    error
})

export const changeScheduleOf = (scheduleOf) => ({
    type: CHANGE_SCHEDULE_OF,
    payload: { scheduleOf }
})