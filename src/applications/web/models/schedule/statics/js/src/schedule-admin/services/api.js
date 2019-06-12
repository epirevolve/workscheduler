import requestAgent from 'superagent';

export const saveSchedules = (payload) => {
    const { schedules } = payload;
    return requestAgent
        .put('/api/schedules')
        .send(schedules)
        .set('X-CSRFToken', csrfToken)
        .then(() => ({}))
        .catch((error) => ({ error }));
};