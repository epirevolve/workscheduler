import requestAgent from 'superagent';

export const saveSchedules = async (payload) => {
    const { schedules } = payload;
    try {
        await requestAgent
            .put('/schedule/api/schedules')
            .send(schedules)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};

export const publishSchedules = async (payload) => {
    const { schedules } = payload;
    try {
        await requestAgent
            .put('/schedule/api/schedules/publish')
            .send(schedules)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};

export const withdrawSchedules = async (payload) => {
    const { schedules } = payload;
    try {
        await requestAgent
            .put('/schedule/api/schedules/withdraw')
            .send(schedules)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};