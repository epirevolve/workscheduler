import requestAgent from 'superagent';

export const fetchCurrentRunners = () => requestAgent
    .get('/scheduler/api/current-runners')
    .set('X-CSRFToken', csrfToken)
    .then((res) => JSON.parse(res.text))
    .then((res) => ({res}))
    .catch((error) => ({error}));

export const fetchLaunchHistories = () => requestAgent
    .get('/scheduler/api/launch-histories')
    .set('X-CSRFToken', csrfToken)
    .then((res) => JSON.parse(res.text))
    .then((res) => ({res}))
    .catch((error) => ({error}));

export const terminateScheduler = (payload) => {
    const { team } = payload;
    return requestAgent
        .put('/scheduler/api/terminate-scheduler')
        .set('X-CSRFToken', csrfToken)
        .send({'teamId': team.id})
        .then(() => ({}))
        .catch((error) => ({error}));
};