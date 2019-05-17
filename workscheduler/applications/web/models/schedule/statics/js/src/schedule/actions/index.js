import requestAgent from 'superagent';

const _fetchSchedules = (affiliation, scheduleOf) => {
    return requestAgent
        .get(`/schedules/api?affiliation-id=${affiliation.id}&schedule-of=${scheduleOf}`)
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

export const changeScheduleOf = (affiliation) => (e) => {
    const scheduleOf = e.toDate().toYearMonthFormatString();
    return _fetchSchedules(affiliation, scheduleOf)
        .then(schedules => ({
            type: 'CHANGE_SCHEDULE_OF',
            scheduleOf,
            ...schedules
        }))
}