import requestAgent from 'superagent';

export const fetchMonthlySetting = async (payload) => {
    const { scheduleOf, team } = payload;
    try {
        const res = await requestAgent
            .get('/scheduler/api/monthly-setting')
            .query({
                'team-id': team.id,
                'schedule-of': scheduleOf
            })
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

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