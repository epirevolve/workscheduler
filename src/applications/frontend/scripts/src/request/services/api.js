import requestAgent from 'superagent';

export const fetchCalendar = async (payload) => {
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

export const appendRequest = async (payload) => {
    const { request } = payload;
    try {
        const res = await requestAgent
            .post('/scheduler/api/requests')
            .send(request)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const updateRequest = async (payload) => {
    const { request } = payload;
    try {
        const res = await requestAgent
            .put(`/scheduler/api/requests/${request.id}`)
            .send(request)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const removeRequest = async (payload) => {
    const { id } = payload;
    try {
        await requestAgent
            .delete(`/scheduler/api/requests/${id}`)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};