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

export const publishSchedules = (payload) => {
    const { schedules } = payload;
    return requestAgent
        .put('/api/schedules/publish')
        .send(schedules)
        .set('X-CSRFToken', csrfToken)
        .then(() => ({}))
        .catch((error) => ({ error }));
};

export const withdrawSchedules = (payload) => {
    const { schedules } = payload;
    return requestAgent
        .put('/api/schedules/withdraw')
        .send(schedules)
        .set('X-CSRFToken', csrfToken)
        .then(() => ({}))
        .catch((error) => ({ error }));
};