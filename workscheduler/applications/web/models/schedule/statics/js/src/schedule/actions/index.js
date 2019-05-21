import requestAgent from 'superagent';

const _fetchSchedules = (affiliation, scheduleOf) => {
    return requestAgent
        .get(`/api/schedules?affiliation-id=${affiliation.id}&schedule-of=${scheduleOf}`)
        .set('X-CSRFToken', csrfToken)
        .then(res => JSON.parse(res.text))
}

export const fetchSchedules = (affiliation, scheduleOf) => {
    return _fetchSchedules(affiliation, scheduleOf)
        .then(schedules => ({
            type: 'FETCH_SCHEDULES',
            ...schedules
        }))
}

export const changeScheduleOf = (affiliation, scheduleOf) => {
    return fetchSchedules(affiliation, scheduleOf)
        .then(action => ({...action,
            type: 'CHANGE_SCHEDULE_OF',
            scheduleOf,
        }))
}