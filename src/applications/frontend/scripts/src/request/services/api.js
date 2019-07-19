import requestAgent from 'superagent';

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