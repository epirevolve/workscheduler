import requestAgent from 'superagent';

export const updateMonthlySetting = (payload) => {
    const { monthlySetting } = payload;
    return requestAgent
        .put('/scheduler/api/monthly-settings')
        .send(monthlySetting)
        .set('X-CSRFToken', csrfToken)
        .then(() => ({}))
        .catch((error) => ({ error }));
};

export const publicMonthlySetting = (payload) => {
    const { monthlySetting } = payload;
    return requestAgent
        .put('/scheduler/api/monthly-settings/public')
        .send(monthlySetting)
        .set('X-CSRFToken', csrfToken)
        .then(() => ({}))
        .catch((error) => ({ error }));
};