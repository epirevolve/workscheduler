import requestAgent from 'superagent';

export const launchScheduler = async (payload) => {
    const { team, month, year } = payload;
    try {
        await requestAgent
            .post('/scheduler/api/launch-scheduler')
            .send({ 'teamId': team.id, month, year })
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};