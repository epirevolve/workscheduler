import requestAgent from 'superagent';

export const updateMonthlySetting = (payload) => {
    const { monthlySetting } = payload;
    return requestAgent
        .put('/api/monthly-setting')
        .send(monthlySetting)
        .set('X-CSRFToken', csrfToken)
        .then(res => JSON.parse(res.text))
        .then(res => ({ res }))
        .catch(error => ({ error }));
}

export const publicMonthlySetting = (payload) => {
    const { monthlySetting } = payload;
    return requestAgent
        .put('/api/monthly-setting/public')
        .send(monthlySetting)
        .set('X-CSRFToken', csrfToken)
        .then(res => JSON.parse(res.text))
        .then(res => ({ res }))
        .catch(error => ({ error }));
}