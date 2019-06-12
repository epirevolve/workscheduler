import requestAgent from 'superagent';

export const launchScheduler = (payload) => {
    const { team, month, year } = payload;
    return requestAgent
        .post('/api/launch-scheduler')
        .send({'teamId': team.id})
        .send({'month': month})
        .send({'year': year})
        .set('X-CSRFToken', csrfToken)
        .then(() => ({}))
        .catch((error) => ({ error }));
};