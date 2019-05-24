import requestAgent from 'superagent';

export const schedules = (payload) => {
    const { affiliation, scheduleOf } = payload;
    return requestAgent
        .get(`/api/schedules?affiliation-id=${affiliation.id}&schedule-of=${scheduleOf}`)
        .set('X-CSRFToken', csrfToken)
        .then(res => JSON.parse(res.text))
        .then(res => ({ res }))
        .catch(error => ({ error }));
}