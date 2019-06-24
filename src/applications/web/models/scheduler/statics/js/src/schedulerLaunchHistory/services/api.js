import requestAgent from 'superagent';

export const fetchCurrentRunners = () => requestAgent
    .get('/scheduler/api/current-runners')
    .set('X-CSRFToken', csrfToken)
    .then((res) => JSON.parse(res.text))
    .then((res) => ({res}))
    .catch((error) => ({error}));

export const fetchLaunchHistories = () => requestAgent
    .get('/scheduler/api/monthly-settings/public')
    .set('X-CSRFToken', csrfToken)
    .then((res) => JSON.parse(res.text))
    .then((res) => ({res}))
    .catch((error) => ({error}));

export const terminateScheduler = (payload) => {
    const { team, month, year } = payload;
    return requestAgent
        .put('/scheduler/api/terminate-scheduler')
        .set('X-CSRFToken', csrfToken)
        .send({'teamId': team.id, month, year})
        .then(() => ({}))
        .catch((error) => ({error}));
};