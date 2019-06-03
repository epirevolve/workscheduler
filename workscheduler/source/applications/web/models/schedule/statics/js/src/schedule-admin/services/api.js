import requestAgent from 'superagent';

export const updateSchedules = (payload) => {
    const { schedules } = payload;
    return requestAgent
        .post('/api/schedules')
        .send(schedules)
        .set('X-CSRFToken', csrfToken)
        .then(res => {})
        .catch(error => ({ error }));
}