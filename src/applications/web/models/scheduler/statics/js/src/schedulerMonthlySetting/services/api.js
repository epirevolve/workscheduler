import requestAgent from 'superagent';

export const updateMonthlySetting = async (payload) => {
    const { monthlySetting } = payload;
    try {
        await requestAgent
            .put('/scheduler/api/monthly-settings')
            .send(monthlySetting)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};

export const publicMonthlySetting = async (payload) => {
    const { monthlySetting } = payload;
    try {
        await requestAgent
            .put('/scheduler/api/monthly-settings/public')
            .send(monthlySetting)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};