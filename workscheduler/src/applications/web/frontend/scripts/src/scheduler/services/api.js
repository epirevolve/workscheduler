import requestAgent from 'superagent';

export const fetchScheduler = async (payload) => {
    const { team } = payload;
    try {
        const res = await requestAgent
            .get('/scheduler/api/scheduler')
            .query({
                'team-id': team.id
            })
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const updateScheduler = async (payload) => {
    const { scheduler } = payload;
    try {
        await requestAgent
            .put('/scheduler/api/scheduler')
            .send(scheduler)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};