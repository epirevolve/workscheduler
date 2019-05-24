import requestAgent from 'superagent';

export const ActionType = {
    requestSchedules: Symbol(),
    fetchSchedules: Symbol(),
    changeScheduleOf: Symbol()
};

const _fetchSchedules = (affiliation, scheduleOf) => {
    return requestAgent
        .get(`/api/schedules?affiliation-id=${affiliation.id}&schedule-of=${scheduleOf}`)
        .set('X-CSRFToken', csrfToken)
        .then(res => JSON.parse(res.text))
}

export const requestSchedules = () => ({
    type: ActionType.requestSchedules
})

export const fetchSchedules = (affiliation, scheduleOf) => {
    return _fetchSchedules(affiliation, scheduleOf)
        .then(schedules => ({
            type: ActionType.fetchSchedules,
            ...schedules
        }))
}

export const changeScheduleOf = (affiliation, scheduleOf) => {
    return fetchSchedules(affiliation, scheduleOf)
        .then(action => ({...action,
            type: ActionType.changeScheduleOf,
            scheduleOf,
        }))
}