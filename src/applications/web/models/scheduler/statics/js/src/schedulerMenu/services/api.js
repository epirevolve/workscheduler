import requestAgent from 'superagent';

export const launchScheduler = (payload) => {
    const { team, month, year } = payload;
    return requestAgent
        .post('/scheduler/api/launch-scheduler')
        .send({'teamId': team.id, month, year})
        .set('X-CSRFToken', csrfToken)
        .then(() => ({}))
        .catch((error) => ({ error }));
};