import requestAgent from 'superagent';

export const fetchSchedules = (payload) => {
    const { team, scheduleOf } = payload;
    return requestAgent
        .get('/api/schedules')
        .query({'team-id': team.id, 'schedule-of': scheduleOf})
        .set('X-CSRFToken', csrfToken)
        .then((res) => JSON.parse(res.text))
        .then((res) => ({ res }))
        .catch((error) => ({ error }));
};