import requestAgent from 'superagent';

export const fetchCurrentRunners = async () => {
    try {
        const res = await requestAgent
            .get('/scheduler/api/current-runners')
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const fetchLaunchHistories = async () => {
    try {
        const res = await requestAgent
            .get('/scheduler/api/launch-histories')
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const terminateScheduler = async (payload) => {
    const { teamId } = payload;
    try {
        await requestAgent
            .put('/scheduler/api/terminate-scheduler')
            .set('X-CSRFToken', csrfToken)
            .send({ teamId });
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};